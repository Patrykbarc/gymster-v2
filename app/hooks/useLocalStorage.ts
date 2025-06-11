import { useEffect, useMemo, useRef, useState } from 'react'

// https://github.com/nas5w/use-local-storage

type Serializer<T> = (object: T | undefined) => string
type Parser<T> = (val: string) => T | undefined
type Setter<T> = React.Dispatch<React.SetStateAction<T | undefined>>

type Options<T> = Partial<{
  serializer: Serializer<T>
  parser: Parser<T>
  logger: (error: any) => void
  syncData: boolean
}>

function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  options?: Options<T>
): [T, Setter<T>]
function useLocalStorage<T>(
  key: string,
  defaultValue?: T,
  options?: Options<T>
) {
  const opts = useMemo(() => {
    return {
      serializer: JSON.stringify,
      parser: JSON.parse,
      logger: console.log,
      syncData: true,
      ...options
    }
  }, [options])

  const { serializer, parser, logger, syncData } = opts

  const rawValueRef = useRef<string | null>(null)

  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') return defaultValue

    try {
      rawValueRef.current = window.localStorage.getItem(key)
      const res: T = rawValueRef.current
        ? parser(rawValueRef.current)
        : defaultValue
      return res
    } catch (e) {
      logger(e)
      return defaultValue
    }
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const isQuotaExceeded = (e: any) => {
      if (!e) return false
      if (e.code && e.code === 22) return true // Safari
      if (e.code && e.code === 1014) return true // Firefox
      if (e.name && e.name === 'QuotaExceededError') return true // Chrome
      return false
    }

    /**
     * Remove the oldest draft item from localStorage to free up space.
     * Oldest is determined by a timestamp stored under `${draftKey}:ts`.
     */
    const evictOldDraft = () => {
      const candidates: { k: string; ts: number }[] = []
      for (let i = 0; i < window.localStorage.length; i += 1) {
        const k = window.localStorage.key(i)
        if (!k) continue
        if (k.includes('-draft') && !k.endsWith(':ts')) {
          const ts = parseInt(window.localStorage.getItem(`${k}:ts`) || '0', 10)
          candidates.push({ k, ts })
        }
      }

      if (candidates.length === 0) return false

      candidates.sort((a, b) => a.ts - b.ts) // oldest first
      const toRemove = candidates[0]
      window.localStorage.removeItem(toRemove.k)
      window.localStorage.removeItem(`${toRemove.k}:ts`)
      return true
    }

    const saveValue = () => {
      const newValue = serializer(value)
      const oldValue = rawValueRef.current
      rawValueRef.current = newValue
      window.localStorage.setItem(key, newValue)
      // store/update timestamp
      window.localStorage.setItem(`${key}:ts`, Date.now().toString())

      window.dispatchEvent(
        new StorageEvent('storage', {
          storageArea: window.localStorage,
          url: window.location.href,
          key,
          newValue,
          oldValue
        })
      )
    }

    const updateLocalStorage = () => {
      // Browser ONLY dispatch storage events to other tabs, NOT current tab.
      // We need to manually dispatch storage event for current tab
      if (value !== undefined) {
        try {
          saveValue()
        } catch (e) {
          if (isQuotaExceeded(e)) {
            // Try to evict drafts until there is space
            let freed = false
            let attempts = 0
            while (!freed && attempts < 5) {
              freed = evictOldDraft()
              attempts += 1
              try {
                if (freed) saveValue()
                else break
              } catch (err) {
                if (!isQuotaExceeded(err)) {
                  throw err
                }
              }
            }
          } else {
            throw e
          }
        }
      } else {
        window.localStorage.removeItem(key)
        window.localStorage.removeItem(`${key}:ts`)
        window.dispatchEvent(
          new StorageEvent('storage', {
            storageArea: window.localStorage,
            url: window.location.href,
            key
          })
        )
      }
    }

    try {
      updateLocalStorage()
    } catch (e) {
      logger(e)
    }
  }, [value])

  useEffect(() => {
    if (!syncData) return

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key !== key || e.storageArea !== window.localStorage) return

      try {
        if (e.newValue !== rawValueRef.current) {
          rawValueRef.current = e.newValue
          setValue(e.newValue ? parser(e.newValue) : undefined)
        }
      } catch (e) {
        logger(e)
      }
    }

    if (typeof window === 'undefined') return

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key, syncData])

  return [value, setValue]
}

export { useLocalStorage }
