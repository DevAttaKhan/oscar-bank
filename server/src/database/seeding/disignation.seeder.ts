import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Designation } from '../entities';

const DesignationsList: string[] = [
  // Top-Level Management
  'Chief Executive Officer (CEO)',
  'Chief Operating Officer (COO)',
  'Chief Financial Officer (CFO)',
  'Chief Risk Officer (CRO)',
  'Chief Technology Officer (CTO)',
  'Managing Director (MD)',
  'Executive Director (ED)',

  // Senior Management
  'General Manager (GM)',
  'Deputy General Manager (DGM)',
  'Assistant General Manager (AGM)',
  'Head of Operations',
  'Head of Credit Risk Management',
  'Head of Compliance',
  'Head of Treasury',
  'Head of IT',
  'Regional Manager',

  // Branch Management
  'Branch Manager',
  'Deputy Branch Manager',
  'Operations Manager',
  'Relationship Manager',
  'Credit Manager',
  'Loan Officer',
  'Customer Service Manager',

  // Department Heads
  'Head of Customer Service',
  'Head of Loans and Advances',
  'Head of Investment Banking',
  'Head of Risk Management',
  'Head of Human Resources',
  'Head of Marketing',
  'Head of Audit and Compliance',
  'Head of Accounts',

  // Mid-Level Positions
  'Senior Officer',
  'Credit Analyst',
  'Investment Officer',
  'Audit Officer',
  'Treasury Officer',
  'Compliance Officer',
  'Operations Officer',
  'Financial Analyst',
  'HR Officer',
  'IT Officer',

  // Technical/Support Roles
  'IT Support Engineer',
  'System Administrator',
  'Database Administrator',
  'Network Engineer',
  'Software Developer',
  'Cybersecurity Specialist',
  'Technical Support Officer',

  // Specialized Roles
  'Forex Manager',
  'Wealth Manager',
  'Risk Analyst',
  'Internal Auditor',
  'Mortgage Advisor',
  'Investment Advisor',
  'Credit Risk Analyst',
  'Legal Advisor',

  // Field Roles
  'Recovery Officer',
  'Field Verification Officer',
  'Sales Executive',
  'Business Development Officer',
];

export class DesignationSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    console.log('designation seed started ....');
    const designationRepo = dataSource.getRepository(Designation);

    for (let designation of DesignationsList) {
      await designationRepo.save({ title: designation });
    }
  }
}
