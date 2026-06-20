# NexusHR — Project Scaffold

This is the **Day 1 scaffold only**: multi-module Maven structure, parent POM,
empty Spring Boot app classes, and base `application.yml` configs for each
service. There is no business logic yet — no entities, no security config,
no controllers. That's intentional: per the Zidio submission rules, the actual
implementation needs to be your own work.

## How to open this in VS Code

1. Unzip this folder.
2. `File > Open Folder` → select `nexushr/`.
3. Install the **Extension Pack for Java** and **Spring Boot Extension Pack**
   if you don't have them.
4. Make sure Postgres is running locally and a `nexushr` database exists.
5. From the root: `mvn clean install` — should build all 5 modules with no
   errors (gateway needs Spring Cloud BOM resolved, give it a minute first run).

## What's here

| Module | Status | Port |
|---|---|---|
| common | empty (add shared DTOs/exceptions as needed) | — |
| auth-service | scaffolded, ready for Day 2-3 work | 8081 |
| employee-service | placeholder pom + stub, build out Day 4 | 8082 |
| payroll-service | placeholder pom + stub, build out Day 10 | 8083 |
| api-gateway | basic routing config wired, no logic | 8080 |

## What you build next (Day 2, per the plan)

In `auth-service`:
- `Employee` and `Role` JPA entities
- Spring Security config with a JWT filter
- Argon2 password encoder bean

Come back to the chat (or keep going in Claude Code) and we'll go through
each piece — what it does, why it's structured that way, and you write/paste
it in so it's something you can actually explain on demo day.
