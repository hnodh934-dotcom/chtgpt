# Permissions Applied to APIs

## ✅ Completed

### Projects API
- `list`: requireOrganizationProcedure (multi-tenancy enforced)
- `get`: requirePermissionProcedure("projects", "read")
- `create`: requirePermissionProcedure("projects", "create")
- `update`: requirePermissionProcedure("projects", "update")

### Tasks API
- `listByProject`: requirePermissionProcedure("tasks", "read")
- `listByAssignee`: requirePermissionProcedure("tasks", "read")
- `create`: requirePermissionProcedure("tasks", "create")
- `update`: requirePermissionProcedure("tasks", "update")

## 🔄 In Progress

### Documents API
- Needs: requirePermissionProcedure("documents", "read/create")

### Subscriptions API
- Needs: requireOrganizationProcedure + permissions

### Invoices API
- Needs: requirePermissionProcedure("invoices", "read/create/update")

### Payments API  
- Needs: requirePermissionProcedure("payments", "create")

### Meetings API
- Needs: requirePermissionProcedure("meetings", "read/create")

### Support Tickets API
- Needs: requirePermissionProcedure("support", "read/create/update")

### Leads API
- `create`: publicProcedure (OK - for lead form)
- `list/get/update`: Needs permissions

### Frameworks API
- Currently public (OK - regulatory data is public)

### Controls API
- Currently public (OK - regulatory data is public)

### Articles API
- Currently public (OK - regulatory data is public)

### Provisions API
- Currently public (OK - regulatory data is public)

### Edges API
- Currently public (OK - regulatory data is public)

## 📝 Notes

- Regulatory data (Frameworks, Controls, Articles, Provisions, Edges) remains public as it's reference data
- Lead creation remains public for website contact form
- All business data (Projects, Tasks, Documents, etc.) requires authentication + permissions
- Multi-tenancy enforced via organizationId in context
