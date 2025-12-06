-- CITC Telecommunications and IT Regulations
-- 30 ضابط من أنظمة هيئة الاتصالات وتقنية المعلومات

-- Domain 1: Licensing and Compliance (6 controls)
INSERT INTO controls (frameworkId, code, name, description, category, priority) VALUES
(5, 'CITC-1.1', 'Service License', 'Obtain and maintain valid service license from CITC', 'Compliance', 'critical'),
(5, 'CITC-1.2', 'License Conditions', 'Comply with all license conditions and obligations', 'Compliance', 'critical'),
(5, 'CITC-1.3', 'Regulatory Reporting', 'Submit required reports to CITC on time', 'Compliance', 'high'),
(5, 'CITC-1.4', 'Fees and Charges', 'Pay regulatory fees and charges as required', 'Compliance', 'high'),
(5, 'CITC-1.5', 'Record Keeping', 'Maintain required records and documentation', 'Operational Controls', 'medium'),
(5, 'CITC-1.6', 'Regulatory Audits', 'Cooperate with CITC audits and inspections', 'Compliance', 'high');

-- Domain 2: Network Security (8 controls)
INSERT INTO controls (frameworkId, code, name, description, category, priority) VALUES
(5, 'CITC-2.1', 'Network Protection', 'Protect telecommunications network from threats', 'Technical Controls', 'critical'),
(5, 'CITC-2.2', 'Access Control', 'Implement access controls for network infrastructure', 'Technical Controls', 'critical'),
(5, 'CITC-2.3', 'Network Monitoring', 'Monitor network for security incidents', 'Technical Controls', 'high'),
(5, 'CITC-2.4', 'Incident Response', 'Respond to network security incidents', 'Operational Controls', 'critical'),
(5, 'CITC-2.5', 'Network Resilience', 'Ensure network resilience and availability', 'Technical Controls', 'high'),
(5, 'CITC-2.6', 'Encryption', 'Implement encryption for sensitive communications', 'Technical Controls', 'high'),
(5, 'CITC-2.7', 'Vulnerability Management', 'Manage network vulnerabilities', 'Technical Controls', 'high'),
(5, 'CITC-2.8', 'Security Testing', 'Test network security regularly', 'Technical Controls', 'medium');

-- Domain 3: Data Protection and Privacy (6 controls)
INSERT INTO controls (frameworkId, code, name, description, category, priority) VALUES
(5, 'CITC-3.1', 'Customer Data Protection', 'Protect customer data and communications', 'Technical Controls', 'critical'),
(5, 'CITC-3.2', 'Privacy Policy', 'Implement privacy policy compliant with regulations', 'Governance', 'high'),
(5, 'CITC-3.3', 'Data Retention', 'Retain data as required by regulations', 'Compliance', 'high'),
(5, 'CITC-3.4', 'Data Sharing', 'Control data sharing with third parties', 'Governance', 'high'),
(5, 'CITC-3.5', 'Customer Consent', 'Obtain customer consent for data processing', 'Compliance', 'high'),
(5, 'CITC-3.6', 'Data Breach Notification', 'Notify CITC and customers of data breaches', 'Compliance', 'critical');

-- Domain 4: Service Quality (5 controls)
INSERT INTO controls (frameworkId, code, name, description, category, priority) VALUES
(5, 'CITC-4.1', 'Quality Standards', 'Meet service quality standards', 'Operational Controls', 'high'),
(5, 'CITC-4.2', 'Service Availability', 'Ensure service availability and uptime', 'Technical Controls', 'high'),
(5, 'CITC-4.3', 'Performance Monitoring', 'Monitor service performance metrics', 'Operational Controls', 'medium'),
(5, 'CITC-4.4', 'Customer Support', 'Provide adequate customer support', 'Operational Controls', 'medium'),
(5, 'CITC-4.5', 'Service Continuity', 'Ensure service continuity and disaster recovery', 'Operational Controls', 'high');

-- Domain 5: Consumer Protection (5 controls)
INSERT INTO controls (frameworkId, code, name, description, category, priority) VALUES
(5, 'CITC-5.1', 'Fair Practices', 'Implement fair business practices', 'Governance', 'high'),
(5, 'CITC-5.2', 'Transparent Pricing', 'Provide transparent pricing information', 'Governance', 'medium'),
(5, 'CITC-5.3', 'Contract Terms', 'Use clear and fair contract terms', 'Governance', 'medium'),
(5, 'CITC-5.4', 'Complaint Handling', 'Handle customer complaints effectively', 'Operational Controls', 'medium'),
(5, 'CITC-5.5', 'Dispute Resolution', 'Provide dispute resolution mechanisms', 'Operational Controls', 'medium');
