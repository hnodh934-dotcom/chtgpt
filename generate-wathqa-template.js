const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
  Header,
  Footer,
  PageNumber,
  HeadingLevel,
  ShadingType,
  VerticalAlign,
  TableLayoutType,
} = require("docx");
const fs = require("fs");

// Color definitions
const GREEN_COLOR = "1B5E4A";
const GOLD_COLOR = "C9A227";
const WHITE_COLOR = "FFFFFF";
const LIGHT_GRAY = "F5F5F5";

// Helper function to create styled header cell
function createHeaderCell(text, width) {
  return new TableCell({
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text: text,
            bold: true,
            color: WHITE_COLOR,
            font: "Arial",
            size: 22,
            rightToLeft: true,
          }),
        ],
        alignment: AlignmentType.CENTER,
        bidirectional: true,
      }),
    ],
    shading: { fill: GREEN_COLOR, type: ShadingType.CLEAR },
    width: { size: width, type: WidthType.PERCENTAGE },
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: 100, bottom: 100, left: 100, right: 100 },
  });
}

// Helper function to create data cell
function createDataCell(text, width, isGray = false) {
  return new TableCell({
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text: text,
            font: "Arial",
            size: 20,
            rightToLeft: true,
          }),
        ],
        alignment: AlignmentType.CENTER,
        bidirectional: true,
      }),
    ],
    shading: isGray ? { fill: LIGHT_GRAY, type: ShadingType.CLEAR } : undefined,
    width: { size: width, type: WidthType.PERCENTAGE },
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: 80, bottom: 80, left: 80, right: 80 },
  });
}

// Helper function for section title
function createSectionTitle(text, number) {
  return new Paragraph({
    children: [
      new TextRun({
        text: `${number}. ${text}`,
        bold: true,
        color: GREEN_COLOR,
        font: "Arial",
        size: 28,
        rightToLeft: true,
      }),
    ],
    spacing: { before: 400, after: 200 },
    alignment: AlignmentType.RIGHT,
    bidirectional: true,
    border: {
      bottom: { color: GOLD_COLOR, size: 12, style: BorderStyle.SINGLE },
    },
  });
}

// Create the document
const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: "Arial", size: 22 },
        paragraph: { alignment: AlignmentType.RIGHT },
      },
    },
  },
  sections: [
    {
      properties: {
        page: {
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
        },
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
                  color: GOLD_COLOR,
                  font: "Arial",
                  size: 16,
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "وثقى للاستشارات القانونية",
                  bold: true,
                  color: GREEN_COLOR,
                  font: "Arial",
                  size: 32,
                  rightToLeft: true,
                }),
              ],
              alignment: AlignmentType.CENTER,
              bidirectional: true,
              spacing: { before: 100 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "WATHQA LEGAL CONSULTANCY",
                  color: GOLD_COLOR,
                  font: "Arial",
                  size: 20,
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 100 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
                  color: GOLD_COLOR,
                  font: "Arial",
                  size: 16,
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
          ],
        }),
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
                  color: GOLD_COLOR,
                  font: "Arial",
                  size: 16,
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "سري وخاص - للاستخدام الداخلي فقط",
                  color: GREEN_COLOR,
                  font: "Arial",
                  size: 18,
                  rightToLeft: true,
                }),
                new TextRun({ text: "          |          ", color: GOLD_COLOR, font: "Arial", size: 18 }),
                new TextRun({
                  text: "صفحة ",
                  color: GREEN_COLOR,
                  font: "Arial",
                  size: 18,
                  rightToLeft: true,
                }),
              ],
              alignment: AlignmentType.CENTER,
              bidirectional: true,
              children: [
                new TextRun({
                  text: "سري وخاص - للاستخدام الداخلي فقط",
                  color: GREEN_COLOR,
                  font: "Arial",
                  size: 18,
                }),
                new TextRun({ text: "    |    " }),
                new TextRun({ text: "صفحة " }),
                new TextRun({ children: [PageNumber.CURRENT] }),
                new TextRun({ text: " من " }),
                new TextRun({ children: [PageNumber.TOTAL_PAGES] }),
              ],
            }),
          ],
        }),
      },
      children: [
        // Document Title
        new Paragraph({
          children: [
            new TextRun({
              text: "مذكرة دراسة القضية",
              bold: true,
              color: GREEN_COLOR,
              font: "Arial",
              size: 44,
              rightToLeft: true,
            }),
          ],
          alignment: AlignmentType.CENTER,
          bidirectional: true,
          spacing: { before: 200, after: 100 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "CASE STUDY MEMORANDUM",
              color: GOLD_COLOR,
              font: "Arial",
              size: 24,
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
        }),

        // Section 1: Case Information
        createSectionTitle("بيانات القضية", "١"),

        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          layout: TableLayoutType.FIXED,
          rows: [
            new TableRow({
              children: [
                createDataCell("[                    ]", 35),
                createHeaderCell("رقم الملف", 15),
                createDataCell("[                    ]", 35),
                createHeaderCell("تاريخ الفتح", 15),
              ],
            }),
            new TableRow({
              children: [
                createDataCell("[                    ]", 35, true),
                createHeaderCell("اسم العميل", 15),
                createDataCell("[                    ]", 35, true),
                createHeaderCell("صفة العميل", 15),
              ],
            }),
            new TableRow({
              children: [
                createDataCell("[                    ]", 35),
                createHeaderCell("نوع القضية", 15),
                createDataCell("[                    ]", 35),
                createHeaderCell("التصنيف", 15),
              ],
            }),
            new TableRow({
              children: [
                createDataCell("[                    ]", 35, true),
                createHeaderCell("المستشار المسؤول", 15),
                createDataCell("[                    ]", 35, true),
                createHeaderCell("الجهة المختصة", 15),
              ],
            }),
          ],
        }),

        // Section 2: Chronological Narrative
        createSectionTitle("السرد الوقائعي - الجدول الزمني", "٢"),

        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          layout: TableLayoutType.FIXED,
          rows: [
            new TableRow({
              children: [
                createHeaderCell("الواقعة / الحدث", 60),
                createHeaderCell("التاريخ", 25),
                createHeaderCell("م", 15),
              ],
            }),
            ...[1, 2, 3, 4, 5].map((num, idx) =>
              new TableRow({
                children: [
                  createDataCell("[                                                            ]", 60, idx % 2 === 1),
                  createDataCell("[          ]", 25, idx % 2 === 1),
                  createDataCell(String(num), 15, idx % 2 === 1),
                ],
              })
            ),
          ],
        }),

        // Section 3: Document Examination
        createSectionTitle("فحص المستندات", "٣"),

        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          layout: TableLayoutType.FIXED,
          rows: [
            new TableRow({
              children: [
                createHeaderCell("الملاحظات", 25),
                createHeaderCell("الوزن القانوني", 20),
                createHeaderCell("الحالة", 15),
                createHeaderCell("المستند", 40),
              ],
            }),
            ...[1, 2, 3, 4].map((_, idx) =>
              new TableRow({
                children: [
                  createDataCell("[          ]", 25, idx % 2 === 1),
                  createDataCell("☐ قوي  ☐ متوسط  ☐ ضعيف", 20, idx % 2 === 1),
                  createDataCell("☐ متوفر  ☐ ناقص", 15, idx % 2 === 1),
                  createDataCell("[                              ]", 40, idx % 2 === 1),
                ],
              })
            ),
          ],
        }),

        // Section 4: Legal Paths Comparison
        createSectionTitle("المسارات القانونية المتاحة", "٤"),

        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          layout: TableLayoutType.FIXED,
          rows: [
            new TableRow({
              children: [
                createHeaderCell("المسار البديل", 50),
                createHeaderCell("المسار الموصى به", 50),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [new TextRun({ text: "الوصف:", bold: true, font: "Arial", size: 20, rightToLeft: true })],
                      alignment: AlignmentType.RIGHT,
                      bidirectional: true,
                    }),
                    new Paragraph({
                      children: [new TextRun({ text: "[                              ]", font: "Arial", size: 20 })],
                      alignment: AlignmentType.RIGHT,
                      spacing: { after: 150 },
                    }),
                    new Paragraph({
                      children: [new TextRun({ text: "المميزات:", bold: true, font: "Arial", size: 20, rightToLeft: true })],
                      alignment: AlignmentType.RIGHT,
                      bidirectional: true,
                    }),
                    new Paragraph({
                      children: [new TextRun({ text: "[                              ]", font: "Arial", size: 20 })],
                      alignment: AlignmentType.RIGHT,
                      spacing: { after: 150 },
                    }),
                    new Paragraph({
                      children: [new TextRun({ text: "العيوب:", bold: true, font: "Arial", size: 20, rightToLeft: true })],
                      alignment: AlignmentType.RIGHT,
                      bidirectional: true,
                    }),
                    new Paragraph({
                      children: [new TextRun({ text: "[                              ]", font: "Arial", size: 20 })],
                      alignment: AlignmentType.RIGHT,
                    }),
                  ],
                  width: { size: 50, type: WidthType.PERCENTAGE },
                  margins: { top: 100, bottom: 100, left: 150, right: 150 },
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [new TextRun({ text: "الوصف:", bold: true, font: "Arial", size: 20, rightToLeft: true })],
                      alignment: AlignmentType.RIGHT,
                      bidirectional: true,
                    }),
                    new Paragraph({
                      children: [new TextRun({ text: "[                              ]", font: "Arial", size: 20 })],
                      alignment: AlignmentType.RIGHT,
                      spacing: { after: 150 },
                    }),
                    new Paragraph({
                      children: [new TextRun({ text: "المميزات:", bold: true, font: "Arial", size: 20, rightToLeft: true })],
                      alignment: AlignmentType.RIGHT,
                      bidirectional: true,
                    }),
                    new Paragraph({
                      children: [new TextRun({ text: "[                              ]", font: "Arial", size: 20 })],
                      alignment: AlignmentType.RIGHT,
                      spacing: { after: 150 },
                    }),
                    new Paragraph({
                      children: [new TextRun({ text: "العيوب:", bold: true, font: "Arial", size: 20, rightToLeft: true })],
                      alignment: AlignmentType.RIGHT,
                      bidirectional: true,
                    }),
                    new Paragraph({
                      children: [new TextRun({ text: "[                              ]", font: "Arial", size: 20 })],
                      alignment: AlignmentType.RIGHT,
                    }),
                  ],
                  width: { size: 50, type: WidthType.PERCENTAGE },
                  shading: { fill: LIGHT_GRAY, type: ShadingType.CLEAR },
                  margins: { top: 100, bottom: 100, left: 150, right: 150 },
                }),
              ],
            }),
          ],
        }),

        // Section 5: Risks and Gains
        createSectionTitle("المخاطر والمكتسبات", "٥"),

        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          layout: TableLayoutType.FIXED,
          rows: [
            new TableRow({
              children: [
                createHeaderCell("المخاطر المحتملة", 50),
                createHeaderCell("نقاط القوة", 50),
              ],
            }),
            ...[1, 2, 3].map((num, idx) =>
              new TableRow({
                children: [
                  createDataCell(`${num}. [                              ]`, 50, idx % 2 === 1),
                  createDataCell(`${num}. [                              ]`, 50, idx % 2 === 1),
                ],
              })
            ),
          ],
        }),

        // Section 6: Work Team
        createSectionTitle("فريق العمل", "٦"),

        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          layout: TableLayoutType.FIXED,
          rows: [
            new TableRow({
              children: [
                createHeaderCell("موعد التسليم", 20),
                createHeaderCell("المهمة", 30),
                createHeaderCell("المكلف", 25),
                createHeaderCell("الدور", 25),
              ],
            }),
            new TableRow({
              children: [
                createDataCell("[          ]", 20),
                createDataCell("[                    ]", 30),
                createDataCell("[              ]", 25),
                createDataCell("المستشار الرئيسي", 25),
              ],
            }),
            new TableRow({
              children: [
                createDataCell("[          ]", 20, true),
                createDataCell("[                    ]", 30, true),
                createDataCell("[              ]", 25, true),
                createDataCell("المستشار المساعد", 25, true),
              ],
            }),
            new TableRow({
              children: [
                createDataCell("[          ]", 20),
                createDataCell("[                    ]", 30),
                createDataCell("[              ]", 25),
                createDataCell("الباحث القانوني", 25),
              ],
            }),
            new TableRow({
              children: [
                createDataCell("[          ]", 20, true),
                createDataCell("[                    ]", 30, true),
                createDataCell("[              ]", 25, true),
                createDataCell("المنسق الإداري", 25, true),
              ],
            }),
          ],
        }),

        // Section 7: Work Plan
        createSectionTitle("خطة العمل", "٧"),

        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          layout: TableLayoutType.FIXED,
          rows: [
            new TableRow({
              children: [
                createHeaderCell("التاريخ المستهدف", 25),
                createHeaderCell("المخرج المتوقع", 40),
                createHeaderCell("المرحلة", 35),
              ],
            }),
            new TableRow({
              children: [
                createDataCell("[          ]", 25),
                createDataCell("[                              ]", 40),
                createDataCell("دراسة وتحليل القضية", 35),
              ],
            }),
            new TableRow({
              children: [
                createDataCell("[          ]", 25, true),
                createDataCell("[                              ]", 40, true),
                createDataCell("إعداد المذكرات القانونية", 35, true),
              ],
            }),
            new TableRow({
              children: [
                createDataCell("[          ]", 25),
                createDataCell("[                              ]", 40),
                createDataCell("تقديم الطلبات والمرافعات", 35),
              ],
            }),
            new TableRow({
              children: [
                createDataCell("[          ]", 25, true),
                createDataCell("[                              ]", 40, true),
                createDataCell("المتابعة والتنفيذ", 35, true),
              ],
            }),
          ],
        }),

        // Section 8: Technical Opinion
        createSectionTitle("الرأي الفني الأولي", "٨"),

        new Paragraph({
          children: [
            new TextRun({
              text: "التوصية:",
              bold: true,
              color: GREEN_COLOR,
              font: "Arial",
              size: 24,
              rightToLeft: true,
            }),
          ],
          alignment: AlignmentType.RIGHT,
          bidirectional: true,
          spacing: { before: 200 },
        }),

        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: "[                                                                                                          ]",
                          font: "Arial",
                          size: 20,
                        }),
                      ],
                      alignment: AlignmentType.RIGHT,
                    }),
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: "[                                                                                                          ]",
                          font: "Arial",
                          size: 20,
                        }),
                      ],
                      alignment: AlignmentType.RIGHT,
                    }),
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: "[                                                                                                          ]",
                          font: "Arial",
                          size: 20,
                        }),
                      ],
                      alignment: AlignmentType.RIGHT,
                    }),
                  ],
                  width: { size: 100, type: WidthType.PERCENTAGE },
                  margins: { top: 150, bottom: 150, left: 150, right: 150 },
                  borders: {
                    top: { style: BorderStyle.SINGLE, size: 8, color: GREEN_COLOR },
                    bottom: { style: BorderStyle.SINGLE, size: 8, color: GREEN_COLOR },
                    left: { style: BorderStyle.SINGLE, size: 8, color: GREEN_COLOR },
                    right: { style: BorderStyle.SINGLE, size: 8, color: GREEN_COLOR },
                  },
                }),
              ],
            }),
          ],
        }),

        new Paragraph({
          children: [
            new TextRun({
              text: "الأسباب والمسوغات:",
              bold: true,
              color: GREEN_COLOR,
              font: "Arial",
              size: 24,
              rightToLeft: true,
            }),
          ],
          alignment: AlignmentType.RIGHT,
          bidirectional: true,
          spacing: { before: 300 },
        }),

        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [new TextRun({ text: "١. [                                                            ]", font: "Arial", size: 20, rightToLeft: true })],
                      alignment: AlignmentType.RIGHT,
                      bidirectional: true,
                      spacing: { after: 100 },
                    }),
                    new Paragraph({
                      children: [new TextRun({ text: "٢. [                                                            ]", font: "Arial", size: 20, rightToLeft: true })],
                      alignment: AlignmentType.RIGHT,
                      bidirectional: true,
                      spacing: { after: 100 },
                    }),
                    new Paragraph({
                      children: [new TextRun({ text: "٣. [                                                            ]", font: "Arial", size: 20, rightToLeft: true })],
                      alignment: AlignmentType.RIGHT,
                      bidirectional: true,
                    }),
                  ],
                  width: { size: 100, type: WidthType.PERCENTAGE },
                  margins: { top: 150, bottom: 150, left: 150, right: 150 },
                  borders: {
                    top: { style: BorderStyle.SINGLE, size: 8, color: GREEN_COLOR },
                    bottom: { style: BorderStyle.SINGLE, size: 8, color: GREEN_COLOR },
                    left: { style: BorderStyle.SINGLE, size: 8, color: GREEN_COLOR },
                    right: { style: BorderStyle.SINGLE, size: 8, color: GREEN_COLOR },
                  },
                }),
              ],
            }),
          ],
        }),

        // Section 9: Signatures and Approval
        createSectionTitle("التوقيعات والاعتماد", "٩"),

        new Paragraph({ children: [], spacing: { before: 200 } }),

        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          layout: TableLayoutType.FIXED,
          rows: [
            new TableRow({
              children: [
                createHeaderCell("اعتماد المدير", 50),
                createHeaderCell("إعداد المستشار", 50),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({ children: [], spacing: { before: 100 } }),
                    new Paragraph({
                      children: [new TextRun({ text: "الاسم: ________________________", font: "Arial", size: 20, rightToLeft: true })],
                      alignment: AlignmentType.RIGHT,
                      bidirectional: true,
                      spacing: { after: 200 },
                    }),
                    new Paragraph({
                      children: [new TextRun({ text: "التوقيع: ________________________", font: "Arial", size: 20, rightToLeft: true })],
                      alignment: AlignmentType.RIGHT,
                      bidirectional: true,
                      spacing: { after: 200 },
                    }),
                    new Paragraph({
                      children: [new TextRun({ text: "التاريخ: ________________________", font: "Arial", size: 20, rightToLeft: true })],
                      alignment: AlignmentType.RIGHT,
                      bidirectional: true,
                      spacing: { after: 100 },
                    }),
                  ],
                  width: { size: 50, type: WidthType.PERCENTAGE },
                  margins: { top: 100, bottom: 100, left: 150, right: 150 },
                }),
                new TableCell({
                  children: [
                    new Paragraph({ children: [], spacing: { before: 100 } }),
                    new Paragraph({
                      children: [new TextRun({ text: "الاسم: ________________________", font: "Arial", size: 20, rightToLeft: true })],
                      alignment: AlignmentType.RIGHT,
                      bidirectional: true,
                      spacing: { after: 200 },
                    }),
                    new Paragraph({
                      children: [new TextRun({ text: "التوقيع: ________________________", font: "Arial", size: 20, rightToLeft: true })],
                      alignment: AlignmentType.RIGHT,
                      bidirectional: true,
                      spacing: { after: 200 },
                    }),
                    new Paragraph({
                      children: [new TextRun({ text: "التاريخ: ________________________", font: "Arial", size: 20, rightToLeft: true })],
                      alignment: AlignmentType.RIGHT,
                      bidirectional: true,
                      spacing: { after: 100 },
                    }),
                  ],
                  width: { size: 50, type: WidthType.PERCENTAGE },
                  shading: { fill: LIGHT_GRAY, type: ShadingType.CLEAR },
                  margins: { top: 100, bottom: 100, left: 150, right: 150 },
                }),
              ],
            }),
          ],
        }),

        // Final Note
        new Paragraph({
          children: [
            new TextRun({
              text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
              color: GOLD_COLOR,
              font: "Arial",
              size: 16,
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { before: 400 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "هذه الوثيقة سرية ومعدة حصرياً لأغراض وثقى للاستشارات القانونية",
              color: GREEN_COLOR,
              font: "Arial",
              size: 18,
              italics: true,
              rightToLeft: true,
            }),
          ],
          alignment: AlignmentType.CENTER,
          bidirectional: true,
          spacing: { before: 100, after: 100 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
              color: GOLD_COLOR,
              font: "Arial",
              size: 16,
            }),
          ],
          alignment: AlignmentType.CENTER,
        }),
      ],
    },
  ],
});

// Generate the document
Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("wathqa-unified-case-template.docx", buffer);
  console.log("✓ Document created successfully: wathqa-unified-case-template.docx");
});
