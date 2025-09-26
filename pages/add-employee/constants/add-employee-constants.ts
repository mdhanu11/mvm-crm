import * as yup from 'yup';

export type EmployeeFormValues = {
    fullName: string;
    dateOfBirth: string;
    nationality: string;
    linkedin: string;
    email: string;
    mobile: string;
    whatsapp: string;
    facebook?: string;
    linkedIn?: string;
    address: string;
    haveChildren: string;
    howManyChildren?: string;
    WhoWIllCare?: string;
  
    // Emergency Contacts
    name1: string;
    relationship1: string;
    phone1: string;
    name2: string;
    relationship2: string;
    phone2: string;
  
    // Role & Compensation
    role: string;
    position: string;
    salary: string;
    currencies: string;
    timeZone: string;
    startTime: string;
    endTime: string;
    workingHours: string;
    rolesAndResponsibilities: string;
    offeredRate: string;
    legalWork: string;
  
    // Experience & Commitment
    experience: string;
    activeWorkCommitments: string;
    waitingForInterviewResult: string;
    referred?: string;
    openToWork: string;
  
    // Certifications
    certifications: string;
    certificate: FileList;
  
    // Device & Setup
    operatingSystem: string;
    ipAddress: string;
    serialNumber: string;
    workstationPhoto: FileList;
    deviceSpecs: FileList;
    backupDeviceSpecs?: FileList;
    mainIsp: FileList;
    backupIsp: FileList;
    confirmRemoteWorkRequirements: string;
  
    // ID & Photo
    id1: string;
    id2: string;
    photo: FileList;
  
    // Portfolio
    sampleWork?: FileList;
    portfolio?: string;
  
    // Bank & Payment
    accountHolderName: string;
    bankName: string;
    accountNumber: string;
    ifscCode?: string;
    wiseAccountEmail?: string;
    payouts: string;
    bonus: string;
  
    // Background Check
    backgroundCheck: string;
  
    // References
    references: {
      name: string;
      contactNumber: string;
      email: string;
      role: string;
      company: string;
      status: string;
    }[];
  
    // Policy Acknowledgement
    acknowledgement: string[];
  };

export const schema = yup.object().shape({
    fullName: yup.string().required('Required'),
  dateOfBirth: yup.string().required('Required'),
  nationality: yup.string().required('Required'),
  linkedin: yup.string().required('Required'),
  email: yup.string().email('Invalid email').required('Required'),
  mobile: yup.string().required('Required'),
  whatsapp: yup.string().required('Required'),
//   facebook: yup.string().optional().nullable(),
//   linkedIn: yup.string().optional().nullable(),
  address: yup.string().required('Required'),
  haveChildren: yup.string().required('Required'),
  howManyChildren: yup.string().notRequired(),
  WhoWIllCare: yup.string().notRequired(),

  // Emergency contacts
  name1: yup.string().required('Required'),
  relationship1: yup.string().required('Required'),
  phone1: yup.string().required('Required'),
  name2: yup.string().required('Required'),
  relationship2: yup.string().required('Required'),
  phone2: yup.string().required('Required'),

  role: yup.string().required('Required'),
  position: yup.string().required('Required'),
  salary: yup.string().required('Required'),
  currencies: yup.string().required('Required'),
  timeZone: yup.string().required('Required'),
  startTime: yup.string().required('Required'),
  endTime: yup.string().required('Required'),
  workingHours: yup.string().required('Required'),
  rolesAndResponsibilities: yup.string().required('Required'),
  offeredRate: yup.string().required('Required'),
  legalWork: yup.string().required('Required'),

  experience: yup.string().required('Required'),
  activeWorkCommitments: yup.string().required('Required'),
  waitingForInterviewResult: yup.string().required('Required'),
  referred: yup.string().notRequired(),
  openToWork: yup.string().required('Required'),

  certifications: yup.string().required('Required'),
  certificate: yup.string().required('Required'),

  operatingSystem: yup.string().required('Required'),
  ipAddress: yup.string().required('Required'),
  serialNumber: yup.string().required('Required'),
  workstationPhoto: yup.mixed().required('Required'),
  deviceSpecs: yup.mixed().required('Required'),
  backupDeviceSpecs: yup.mixed().notRequired(),
  mainIsp: yup.mixed().required('Required'),
  backupIsp: yup.mixed().required('Required'),
  confirmRemoteWorkRequirements: yup.string().required('Required'),

  id1: yup.string().required('Required'),
  id2: yup.string().required('Required'),
  photo: yup.mixed().required('Required'),

  sampleWork: yup.mixed().notRequired(),
//   portfolio: yup.string().optional().nullable(),

  accountHolderName: yup.string().required('Required'),
  bankName: yup.string().required('Required'),
  accountNumber: yup.string().required('Required'),
  ifscCode: yup.string().notRequired(),
  wiseAccountEmail: yup.string().email().notRequired(),
  payouts: yup.string().required('Required'),
  bonus: yup.string().required('Required'),

  backgroundCheck: yup.string().required('Required'),

  references: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required(),
        contactNumber: yup.string().required(),
        email: yup.string().email().required(),
        role: yup.string().required(),
        company: yup.string().required(),
        status: yup.string().required(),
      })
    )
    .min(1)
    .required(),

  acknowledgement: yup.array().of(yup.string()).min(1, 'Please acknowledge at least one policy'),

});

export const policyAcknowledgement = [
    "Company confidentiality and data protection policies", 
    "MVM work ethics and professional guidelines", 
"Remote work policies", "No work = No pay",
"15 days annual leave(10 casual + 5 sick)",
 "Use of Time Doctor for time tracking", "Cash Bond Policy(10 days' salary held in 3 tranches)"
]

export const nationalities= [
    "Indian",
    "Filipino",
    "South African",
    "Vietnamese",
    "Malaysian",
    "Pakistani",
    "Bangladeshi",
    "Sri Lankan",
    "Mexican"
  ];

  export const timeZone=["AEST", "GST", "IST", "BEST", "EST", "PST" ]

  export const currencies=["USD", "AUD", "GBP", "PHP", "INR", "EUR", "SGD", "AED"]

  export const govtIds=["Passport","National Id","License","Residency Card"]