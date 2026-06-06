# Contributing Guide

## Getting Started

1. Fork the repository
2. Clone your fork
3. Create a feature branch
4. Make your changes
5. Submit a pull request

## Development Workflow

### Branch Naming
```
feature/description
bugfix/description
docs/description
```

### Commit Messages
```
[TYPE] Brief description

Detailed explanation if needed.

Types: feat, fix, docs, style, refactor, test, chore
```

## Code Style

### TypeScript
- Use strict mode
- Type all function parameters and returns
- Use interfaces for object types
- Use enums for fixed values

### Naming Conventions
- Variables: camelCase
- Classes/Interfaces: PascalCase
- Constants: UPPER_SNAKE_CASE
- Files: kebab-case or PascalCase for components

### Testing
- Unit tests for all functions
- Integration tests for APIs
- E2E tests for critical flows

## Pull Request Process

1. Update tests
2. Update documentation
3. Ensure all tests pass
4. Request review from maintainers
5. Address feedback
6. Squash commits if needed
7. Merge when approved

## Code Review

Reviewers will check:
- Code quality
- Test coverage
- Documentation
- Performance impact
- Security implications
- Style compliance

## Performance Guidelines

- API responses < 200ms
- Database queries < 100ms
- Frontend interactions < 100ms
- Bundle size < 500KB

## Security Checklist

- [ ] Input validation
- [ ] SQL injection prevention
- [ ] XSS prevention
- [ ] CSRF protection
- [ ] No hardcoded secrets
- [ ] Error handling
- [ ] Logging security

## Release Process

1. Create release branch
2. Update version numbers
3. Update CHANGELOG
4. Run full test suite
5. Tag release
6. Deploy to production
7. Monitor for issues
