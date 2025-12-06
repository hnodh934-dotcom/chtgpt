-- SAMA Cybersecurity Framework Controls
-- 50 ضابط رئيسي من إطار الأمن السيبراني للبنك المركزي السعودي

-- Domain 1: Cybersecurity Governance (10 controls)
INSERT INTO controls (frameworkId, code, name, description, category, priority) VALUES
(3, 'SAMA-1.1', 'Cybersecurity Governance Framework', 'Establish and maintain a comprehensive cybersecurity governance framework aligned with business objectives and risk appetite', 'Governance', 'critical'),
(3, 'SAMA-1.2', 'Board Oversight', 'Board of Directors must provide effective oversight of cybersecurity risks and ensure adequate resources', 'Governance', 'critical'),
(3, 'SAMA-1.3', 'Management Responsibility', 'Senior management must be accountable for cybersecurity program implementation and effectiveness', 'Governance', 'critical'),
(3, 'SAMA-1.4', 'Cybersecurity Strategy', 'Develop and implement a comprehensive cybersecurity strategy aligned with business strategy', 'Governance', 'high'),
(3, 'SAMA-1.5', 'Risk Assessment', 'Conduct regular and comprehensive cybersecurity risk assessments covering all critical assets', 'Risk Management', 'high'),
(3, 'SAMA-1.6', 'Policy Framework', 'Establish comprehensive cybersecurity policies, standards, and procedures covering all domains', 'Governance', 'high'),
(3, 'SAMA-1.7', 'Roles and Responsibilities', 'Define clear cybersecurity roles, responsibilities, and reporting lines', 'Governance', 'high'),
(3, 'SAMA-1.8', 'Third-Party Risk Management', 'Manage cybersecurity risks from third-party service providers and vendors', 'Risk Management', 'high'),
(3, 'SAMA-1.9', 'Compliance Monitoring', 'Monitor compliance with cybersecurity requirements and regulatory obligations', 'Compliance', 'high'),
(3, 'SAMA-1.10', 'Performance Metrics', 'Establish cybersecurity performance metrics, KPIs, and reporting mechanisms', 'Governance', 'medium');

-- Domain 2: Cybersecurity Defense (15 controls)
INSERT INTO controls (frameworkId, code, name, description, category, priority) VALUES
(3, 'SAMA-2.1', 'Network Security', 'Implement comprehensive network security controls including firewalls, IDS/IPS, and segmentation', 'Technical Controls', 'critical'),
(3, 'SAMA-2.2', 'Access Control', 'Implement strong access control mechanisms based on least privilege principle', 'Technical Controls', 'critical'),
(3, 'SAMA-2.3', 'Authentication', 'Implement multi-factor authentication for all critical systems and remote access', 'Technical Controls', 'critical'),
(3, 'SAMA-2.4', 'Encryption', 'Implement encryption for data at rest and in transit using approved algorithms', 'Technical Controls', 'critical'),
(3, 'SAMA-2.5', 'Endpoint Security', 'Implement endpoint protection on all devices including anti-malware and host-based firewalls', 'Technical Controls', 'high'),
(3, 'SAMA-2.6', 'Vulnerability Management', 'Implement vulnerability scanning, assessment, and patch management programs', 'Technical Controls', 'high'),
(3, 'SAMA-2.7', 'Malware Protection', 'Deploy anti-malware solutions across the infrastructure with real-time protection', 'Technical Controls', 'high'),
(3, 'SAMA-2.8', 'Data Loss Prevention', 'Implement DLP controls to prevent unauthorized data exfiltration', 'Technical Controls', 'high'),
(3, 'SAMA-2.9', 'Email Security', 'Implement email security controls including anti-phishing and anti-spam', 'Technical Controls', 'high'),
(3, 'SAMA-2.10', 'Web Application Security', 'Secure web applications against OWASP Top 10 and implement WAF', 'Technical Controls', 'high'),
(3, 'SAMA-2.11', 'Mobile Device Security', 'Implement mobile device management and security controls', 'Technical Controls', 'medium'),
(3, 'SAMA-2.12', 'Wireless Security', 'Secure wireless networks and access points with strong encryption', 'Technical Controls', 'medium'),
(3, 'SAMA-2.13', 'Database Security', 'Implement database security controls including access controls and encryption', 'Technical Controls', 'high'),
(3, 'SAMA-2.14', 'Cloud Security', 'Implement security controls for cloud services and ensure compliance', 'Technical Controls', 'high'),
(3, 'SAMA-2.15', 'Secure Configuration', 'Maintain secure configuration baselines for all systems and applications', 'Technical Controls', 'medium');

-- Domain 3: Cybersecurity Resilience (10 controls)
INSERT INTO controls (frameworkId, code, name, description, category, priority) VALUES
(3, 'SAMA-3.1', 'Business Continuity Planning', 'Develop and maintain business continuity plans for critical services', 'Operational Controls', 'critical'),
(3, 'SAMA-3.2', 'Disaster Recovery', 'Implement disaster recovery capabilities with defined RTOs and RPOs', 'Operational Controls', 'critical'),
(3, 'SAMA-3.3', 'Backup and Recovery', 'Implement regular backup and recovery procedures with testing', 'Technical Controls', 'critical'),
(3, 'SAMA-3.4', 'Incident Response Plan', 'Establish incident response procedures and capabilities', 'Operational Controls', 'critical'),
(3, 'SAMA-3.5', 'Crisis Management', 'Develop crisis management capabilities and communication plans', 'Operational Controls', 'high'),
(3, 'SAMA-3.6', 'Redundancy', 'Implement redundancy for critical systems and infrastructure', 'Technical Controls', 'high'),
(3, 'SAMA-3.7', 'Testing and Exercises', 'Conduct regular BCP/DR testing and tabletop exercises', 'Operational Controls', 'high'),
(3, 'SAMA-3.8', 'Resilience Metrics', 'Measure and monitor resilience capabilities and performance', 'Operational Controls', 'medium'),
(3, 'SAMA-3.9', 'Supply Chain Resilience', 'Ensure resilience of critical suppliers and service providers', 'Operational Controls', 'high'),
(3, 'SAMA-3.10', 'Communication Plan', 'Establish crisis communication procedures for stakeholders', 'Operational Controls', 'medium');

-- Domain 4: Cybersecurity Assurance (8 controls)
INSERT INTO controls (frameworkId, code, name, description, category, priority) VALUES
(3, 'SAMA-4.1', 'Security Monitoring', 'Implement continuous security monitoring and threat detection', 'Technical Controls', 'critical'),
(3, 'SAMA-4.2', 'Log Management', 'Collect, analyze, and retain security logs for all critical systems', 'Technical Controls', 'high'),
(3, 'SAMA-4.3', 'SIEM Implementation', 'Deploy Security Information and Event Management system', 'Technical Controls', 'high'),
(3, 'SAMA-4.4', 'Threat Intelligence', 'Utilize cyber threat intelligence to enhance security posture', 'Technical Controls', 'high'),
(3, 'SAMA-4.5', 'Security Testing', 'Conduct regular security testing and vulnerability assessments', 'Technical Controls', 'high'),
(3, 'SAMA-4.6', 'Penetration Testing', 'Perform annual penetration testing by qualified third parties', 'Technical Controls', 'high'),
(3, 'SAMA-4.7', 'Security Audits', 'Conduct regular internal and external security audits', 'Compliance', 'high'),
(3, 'SAMA-4.8', 'Compliance Reporting', 'Report cybersecurity status and incidents to SAMA as required', 'Compliance', 'critical');

-- Domain 5: Third-Party Cybersecurity (7 controls)
INSERT INTO controls (frameworkId, code, name, description, category, priority) VALUES
(3, 'SAMA-5.1', 'Third-Party Assessment', 'Assess cybersecurity posture of third-party providers before engagement', 'Risk Management', 'high'),
(3, 'SAMA-5.2', 'Contractual Requirements', 'Include comprehensive cybersecurity requirements in third-party contracts', 'Governance', 'high'),
(3, 'SAMA-5.3', 'Ongoing Monitoring', 'Monitor third-party cybersecurity performance and compliance', 'Risk Management', 'high'),
(3, 'SAMA-5.4', 'Data Sharing Controls', 'Control and monitor data sharing with third parties', 'Technical Controls', 'high'),
(3, 'SAMA-5.5', 'Access Management', 'Manage and monitor third-party access to systems and data', 'Technical Controls', 'high'),
(3, 'SAMA-5.6', 'Incident Notification', 'Require third-party incident notification and response', 'Operational Controls', 'high'),
(3, 'SAMA-5.7', 'Exit Strategy', 'Establish secure third-party exit and data return procedures', 'Operational Controls', 'medium');
