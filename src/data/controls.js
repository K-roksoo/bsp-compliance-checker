const controls = [
  // IT Governance
  {
    id: "ITG-001",
    domain: "IT Governance",
    controlName: "IT Strategic Plan Alignment",
    description:
      "The Board and Senior Management must ensure that the IT strategic plan is aligned with the institution's overall business strategy and risk appetite, reviewed at least annually.",
    riskLevel: "High",
  },
  {
    id: "ITG-002",
    domain: "IT Governance",
    controlName: "IT Risk Management Framework",
    description:
      "A documented IT risk management framework must be established, approved by the Board, and communicated across the organization to identify, assess, monitor, and mitigate technology risks.",
    riskLevel: "High",
  },
  {
    id: "ITG-003",
    domain: "IT Governance",
    controlName: "IT Roles and Responsibilities",
    description:
      "Clearly defined IT governance roles including a Chief Information Officer (CIO) or equivalent must be established, with accountability lines documented and segregation of duties enforced.",
    riskLevel: "Medium",
  },
  {
    id: "ITG-004",
    domain: "IT Governance",
    controlName: "IT Performance Monitoring and Reporting",
    description:
      "Regular IT performance metrics, key risk indicators (KRIs), and key performance indicators (KPIs) must be reported to Senior Management and the Board on a periodic basis.",
    riskLevel: "Medium",
  },

  // Cybersecurity
  {
    id: "CYB-001",
    domain: "Cybersecurity",
    controlName: "Information Security Policy",
    description:
      "A comprehensive information security policy covering confidentiality, integrity, and availability of data must be documented, approved by the Board, and reviewed at least annually.",
    riskLevel: "High",
  },
  {
    id: "CYB-002",
    domain: "Cybersecurity",
    controlName: "Access Control and Identity Management",
    description:
      "Role-based access controls (RBAC) must be implemented to ensure that users are granted the minimum privileges necessary. Privileged access must be strictly managed and regularly reviewed.",
    riskLevel: "High",
  },
  {
    id: "CYB-003",
    domain: "Cybersecurity",
    controlName: "Vulnerability and Patch Management",
    description:
      "A formal vulnerability management program must be maintained, including regular vulnerability scanning, timely patch application, and tracking of remediation activities within defined SLAs.",
    riskLevel: "High",
  },
  {
    id: "CYB-004",
    domain: "Cybersecurity",
    controlName: "Security Incident Response Plan",
    description:
      "A documented cybersecurity incident response plan must be in place, tested at least annually, and include procedures for detection, containment, eradication, recovery, and post-incident review.",
    riskLevel: "High",
  },
  {
    id: "CYB-005",
    domain: "Cybersecurity",
    controlName: "Multi-Factor Authentication (MFA)",
    description:
      "Multi-factor authentication must be enforced for all remote access, privileged accounts, and critical systems to reduce the risk of unauthorized access through compromised credentials.",
    riskLevel: "High",
  },
  {
    id: "CYB-006",
    domain: "Cybersecurity",
    controlName: "Security Awareness Training",
    description:
      "All personnel must undergo cybersecurity awareness training upon onboarding and at least annually thereafter, covering phishing, social engineering, data handling, and incident reporting.",
    riskLevel: "Medium",
  },
  {
    id: "CYB-007",
    domain: "Cybersecurity",
    controlName: "Network Security and Segmentation",
    description:
      "Network infrastructure must be segmented using firewalls, DMZs, and VLANs to isolate critical systems. Firewall rules must be reviewed periodically and unauthorized access attempts must be logged.",
    riskLevel: "High",
  },
  {
    id: "CYB-008",
    domain: "Cybersecurity",
    controlName: "Data Encryption Standards",
    description:
      "Sensitive data must be encrypted both at rest and in transit using industry-standard encryption protocols. Encryption key management procedures must be documented and enforced.",
    riskLevel: "High",
  },

  // Business Continuity
  {
    id: "BCM-001",
    domain: "Business Continuity",
    controlName: "Business Continuity Plan (BCP)",
    description:
      "A comprehensive Business Continuity Plan must be developed, approved by the Board, and tested at least annually to ensure the institution can continue critical operations during disruptions.",
    riskLevel: "High",
  },
  {
    id: "BCM-002",
    domain: "Business Continuity",
    controlName: "Disaster Recovery Plan (DRP)",
    description:
      "A Disaster Recovery Plan for IT systems must define Recovery Time Objectives (RTO) and Recovery Point Objectives (RPO) aligned with business criticality, and must be tested at least annually.",
    riskLevel: "High",
  },
  {
    id: "BCM-003",
    domain: "Business Continuity",
    controlName: "Backup and Restoration Procedures",
    description:
      "Regular backups of critical data and systems must be performed, stored offsite or in a geographically separate location, and tested periodically to verify successful restoration.",
    riskLevel: "High",
  },
  {
    id: "BCM-004",
    domain: "Business Continuity",
    controlName: "Business Impact Analysis (BIA)",
    description:
      "A Business Impact Analysis must be conducted to identify critical business functions, their IT dependencies, and the potential impact of disruptions to inform continuity planning priorities.",
    riskLevel: "Medium",
  },

  // IT Operations
  {
    id: "OPS-001",
    domain: "IT Operations",
    controlName: "Change Management Process",
    description:
      "All IT changes must follow a formal change management process including request, impact assessment, approval, testing, implementation, and post-implementation review before deployment to production.",
    riskLevel: "Medium",
  },
  {
    id: "OPS-002",
    domain: "IT Operations",
    controlName: "IT Asset Inventory Management",
    description:
      "A complete and up-to-date inventory of all IT hardware, software, and data assets must be maintained to support risk assessments, patching, and license compliance tracking.",
    riskLevel: "Medium",
  },
  {
    id: "OPS-003",
    domain: "IT Operations",
    controlName: "System and Audit Log Management",
    description:
      "Audit logs for all critical systems must be enabled, protected from tampering, retained for a minimum period as required by regulation, and reviewed regularly for anomalous activity.",
    riskLevel: "Medium",
  },

  // Third-Party Risk
  {
    id: "TPR-001",
    domain: "Third-Party Risk",
    controlName: "IT Outsourcing Risk Assessment",
    description:
      "Prior to engaging third-party IT service providers, a comprehensive risk assessment must be conducted covering security controls, financial stability, regulatory compliance, and exit strategies.",
    riskLevel: "High",
  },
  {
    id: "TPR-002",
    domain: "Third-Party Risk",
    controlName: "Vendor Contract and SLA Management",
    description:
      "Contracts with third-party IT vendors must include security requirements, data protection obligations, audit rights, incident notification clauses, and defined service level agreements (SLAs).",
    riskLevel: "Medium",
  },
  {
    id: "TPR-003",
    domain: "Third-Party Risk",
    controlName: "Ongoing Third-Party Monitoring",
    description:
      "Third-party IT service providers must be monitored on an ongoing basis through periodic performance reviews, security assessments, and compliance audits to verify continued adherence to requirements.",
    riskLevel: "Medium",
  },

  // Data Management
  {
    id: "DAT-001",
    domain: "Data Management",
    controlName: "Data Classification and Handling",
    description:
      "All data assets must be classified according to sensitivity (e.g., public, internal, confidential, restricted) and handled according to documented data handling and retention policies.",
    riskLevel: "Medium",
  },
  {
    id: "DAT-002",
    domain: "Data Management",
    controlName: "Data Privacy and Customer Protection",
    description:
      "Controls must be in place to protect customer and personally identifiable information (PII) in compliance with applicable data privacy laws, including access controls, data minimization, and breach notification procedures.",
    riskLevel: "High",
  },
];

export default controls;
