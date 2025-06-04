# Gymster v2

A gym and workout management application.

## Requirements

- Node.js (version 18 or higher)
- Supabase account
- Node package manager (pnpm recommended)
- Docker (for database migrations)

> ⚠️ **NOTE**<br/>
> If you are using a package manager other than **pnpm**, make sure to update the package.json scripts to your preferred manager.

## Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Supabase Setup

1. Create a new project in [Supabase](https://supabase.com)
2. Copy `.env.example` to `.env` and update the following environment variables with your Supabase credentials:

```bash
cp .env.example .env
```

Required environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_DB_PASSWORD=your-supabase-db-password
```

### 3. Running the Application

In development mode:

```bash
pnpm dev
```

The application will be available at `http://localhost:5173`.

## Available Scripts

- `pnpm dev` - starts development server
- `pnpm build` - builds the application for production
- `pnpm start` - runs the built application
- `pnpm typecheck` - runs the type checking tool
- `pnpm lint` - runs the linter
- `pnpm prettier` - formats the code
- `pnpm ese:codegen` - runs playwright code generator
- `pnpm e2e:test` - runs end-to-end tests
- `pnpm db:generate-types` - generates the database types
- `pnpm db:pull` - pulls the database schema from Supabase

> ℹ **NOTE**<br/>
> To perform the `db:pull` command, you need to have Docker Daemon running.

## Commit Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for our commit messages. This helps maintain a clean and consistent git history.

### Commit Message Format

```
<type>: <description>
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `build`: Changes that affect the build system or external dependencies
- `ci`: Changes to our CI configuration files and scripts
- `chore`: Other changes that don't modify src or test files

### Examples

```
feat: add login functionality
fix: resolve user data fetching issue
docs: update installation instructions
style: format button component
```

## Contributing

1. Create a new branch (`git checkout -b feature/new-feature`)
2. Commit your changes following the commit convention
3. Push to the branch (`git push origin feature/new-feature`)
4. Create a Pull Request

## License

MIT
