-- NCA Essential Cybersecurity Controls (ECC)
-- 40 ضابط أساسي من الضوابط الأساسية للأمن السيبراني

-- Domain 1: Cybersecurity Governance (8 controls)
INSERT INTO controls (frameworkId, code, name, description, category, priority) VALUES
(4, 'NCA-1-1-1', 'Cybersecurity Governance', 'Establish cybersecurity governance framework with clear roles and responsibilities', 'Governance', 'critical'),
(4, 'NCA-1-1-2', 'Cybersecurity Policy', 'Develop and approve comprehensive cybersecurity policy', 'Governance', 'critical'),
(4, 'NCA-1-1-3', 'Risk Management', 'Implement cybersecurity risk management program', 'Risk Management', 'critical'),
(4, 'NCA-1-1-4', 'Third-Party Risk', 'Manage cybersecurity risks from third parties', 'Risk Management', 'high'),
(4, 'NCA-1-1-5', 'Security Awareness', 'Implement security awareness and training program', 'Operational Controls', 'high'),
(4, 'NCA-1-1-6', 'Compliance Management', 'Monitor compliance with cybersecurity requirements', 'Compliance', 'high'),
(4, 'NCA-1-1-7', 'Performance Measurement', 'Measure cybersecurity program effectiveness', 'Governance', 'medium'),
(4, 'NCA-1-1-8', 'Continuous Improvement', 'Continuously improve cybersecurity posture', 'Governance', 'medium');

-- Domain 2: Cybersecurity Defense (12 controls)
INSERT INTO controls (frameworkId, code, name, description, category, priority) VALUES
(4, 'NCA-2-1-1', 'Asset Management', 'Maintain inventory of all information assets', 'Operational Controls', 'high'),
(4, 'NCA-2-1-2', 'Network Security', 'Implement network security controls and segmentation', 'Technical Controls', 'critical'),
(4, 'NCA-2-1-3', 'Access Control', 'Implement access control based on least privilege', 'Technical Controls', 'critical'),
(4, 'NCA-2-1-4', 'Cryptography', 'Implement cryptographic controls for data protection', 'Technical Controls', 'critical'),
(4, 'NCA-2-1-5', 'System Hardening', 'Harden systems and applications', 'Technical Controls', 'high'),
(4, 'NCA-2-1-6', 'Vulnerability Management', 'Implement vulnerability management program', 'Technical Controls', 'high'),
(4, 'NCA-2-1-7', 'Malware Protection', 'Deploy malware protection across infrastructure', 'Technical Controls', 'high'),
(4, 'NCA-2-1-8', 'Secure Development', 'Implement secure development lifecycle', 'Technical Controls', 'high'),
(4, 'NCA-2-1-9', 'Data Protection', 'Protect sensitive data throughout lifecycle', 'Technical Controls', 'critical'),
(4, 'NCA-2-1-10', 'Email Security', 'Implement email security controls', 'Technical Controls', 'high'),
(4, 'NCA-2-1-11', 'Web Security', 'Secure web applications and services', 'Technical Controls', 'high'),
(4, 'NCA-2-1-12', 'Mobile Security', 'Implement mobile device security', 'Technical Controls', 'medium');

-- Domain 3: Cybersecurity Resilience (8 controls)
INSERT INTO controls (frameworkId, code, name, description, category, priority) VALUES
(4, 'NCA-3-1-1', 'Business Continuity', 'Develop business continuity plans', 'Operational Controls', 'critical'),
(4, 'NCA-3-1-2', 'Disaster Recovery', 'Implement disaster recovery capabilities', 'Operational Controls', 'critical'),
(4, 'NCA-3-1-3', 'Backup Management', 'Implement backup and recovery procedures', 'Technical Controls', 'critical'),
(4, 'NCA-3-1-4', 'Incident Management', 'Establish incident management procedures', 'Operational Controls', 'critical'),
(4, 'NCA-3-1-5', 'Crisis Management', 'Develop crisis management capabilities', 'Operational Controls', 'high'),
(4, 'NCA-3-1-6', 'Testing and Exercises', 'Test resilience capabilities regularly', 'Operational Controls', 'high'),
(4, 'NCA-3-1-7', 'Redundancy', 'Implement redundancy for critical systems', 'Technical Controls', 'high'),
(4, 'NCA-3-1-8', 'Recovery Objectives', 'Define and meet recovery objectives', 'Operational Controls', 'high');

-- Domain 4: Cybersecurity Assurance (7 controls)
INSERT INTO controls (frameworkId, code, name, description, category, priority) VALUES
(4, 'NCA-4-1-1', 'Security Monitoring', 'Implement continuous security monitoring', 'Technical Controls', 'critical'),
(4, 'NCA-4-1-2', 'Log Management', 'Collect and analyze security logs', 'Technical Controls', 'high'),
(4, 'NCA-4-1-3', 'Threat Detection', 'Implement threat detection capabilities', 'Technical Controls', 'high'),
(4, 'NCA-4-1-4', 'Security Testing', 'Conduct regular security testing', 'Technical Controls', 'high'),
(4, 'NCA-4-1-5', 'Penetration Testing', 'Perform penetration testing annually', 'Technical Controls', 'high'),
(4, 'NCA-4-1-6', 'Security Audit', 'Conduct security audits regularly', 'Compliance', 'high'),
(4, 'NCA-4-1-7', 'Compliance Reporting', 'Report cybersecurity status to NCA', 'Compliance', 'critical');

-- Domain 5: Cybersecurity Incident Management (5 controls)
INSERT INTO controls (frameworkId, code, name, description, category, priority) VALUES
(4, 'NCA-5-1-1', 'Incident Response Plan', 'Develop incident response plan', 'Operational Controls', 'critical'),
(4, 'NCA-5-1-2', 'Incident Detection', 'Detect cybersecurity incidents promptly', 'Technical Controls', 'critical'),
(4, 'NCA-5-1-3', 'Incident Analysis', 'Analyze and classify incidents', 'Operational Controls', 'high'),
(4, 'NCA-5-1-4', 'Incident Containment', 'Contain and eradicate incidents', 'Operational Controls', 'critical'),
(4, 'NCA-5-1-5', 'Incident Reporting', 'Report incidents to NCA as required', 'Compliance', 'critical');
