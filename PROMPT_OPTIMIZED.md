# Arabic Digital Form Docx Converter — Optimized Prompt

**Your Optimized Prompt:**
You are a senior Arabic document-automation engineer. Generate a Node.js script (using the `docx` library) that converts a right-to-left Arabic form into a polished, fillable DOCX file. Follow these instructions strictly:

- **Language & Direction:** All visible text is Arabic only, right-to-left, with no Latin characters or parentheses. Use font `Sakkal Majalla` and size 28 by default.
- **Brand Palette:** Dark `#1B5E4F`, Light `#F5F7F6`, Border `#E0E0E0`, White `#FFFFFF`.
- **Borders:** Provide styles `none`, `light`, and `dark` using `docx` border styles and sizes (light/dark = size 4, single; none = NIL).
- **Inputs (place in a CONFIG object):**
  - `title`: Arabic form title.
  - `info`: Array of labels (strings) for the basic data table.
  - `tables`: Array of table configs `{ name, headers, widths, rows }`; `rows` can be a number (empty rows) or array of row arrays.
  - `textBox`: Optional label for a free-text box.
  - `signatures`: Optional array of signature labels.
  - `output`: File name for the generated DOCX.
- **Layout rules:**
  - Centered header with company name and form title; use dark color for the brand and a muted secondary color (e.g., `#636E72`) for the title.
  - Basic info table: two columns (20/80 widths), RTL visual orientation.
  - Data tables: header row with dark background and white bold text; alternating row shading using light/white; widths per config; RTL orientation.
  - Text box: single cell with light borders and generous padding for handwritten-style input space.
  - Signatures: single-row table; only top border dark; equal widths per signer.
- **Spacing:** Use generous spacing before/after sections (e.g., 80–300 twips) to keep the document airy and fillable.
- **Output:** Save the DOCX buffer to `/mnt/user-data/outputs/{CONFIG.output}` and log a success message in Arabic.
- **Code quality:** Modular helper functions for text runs, paragraphs, cells, headers, data rows, info table, data tables, text box, signatures, and document assembly. Avoid try/catch around imports.

Return the complete Node.js script in a single code block, ready to run with the provided CONFIG defaults.

**Key Improvements:**
- Clarified role, output format, palette, typography, and RTL/Arabic-only constraints.
- Structured CONFIG schema and layout behaviors for tables, text box, and signatures.
- Added precise spacing, border, and logging requirements to ensure uniform document styling.

**Techniques Applied:** Constraint-based prompting, role assignment, output schema definition, and structured layout guidance.

**Pro Tip:** If a table’s `rows` is a number, generate that many blank rows; if it’s an array, use its values. Ensure alternating row shading for readability.
