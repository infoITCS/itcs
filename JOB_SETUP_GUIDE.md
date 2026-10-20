# Job Seeding Setup Guide

## Overview
The ITCS website now includes a complete job management system with:
- ✅ 6 job openings from https://itcs.com.pk/careers/
- ✅ Job listing page with department filtering
- ✅ Detailed job detail page with theme-matched styling
- ✅ Backend API for job CRUD operations

## Job Openings Added

1. **IT Sales Specialist** - Karachi (Sales)
2. **Tender Specialist** - Islamabad (Sales)
3. **HR Executive** - Islamabad (HR)
4. **IT Sales Executive** - Lahore, Karachi & Rawalpindi (Sales)
5. **Microsoft Defender EDR/XDR Specialist** - Islamabad (Security)
6. **ITCS Internship Program** - Islamabad, Lahore, Karachi (Engineering)

## Setup Instructions

### Step 1: Seed the Database with Jobs

Once your backend is running on `http://localhost:5000`, make an HTTP POST request to:

```
POST http://localhost:5000/api/jobsAdd/seed/init
```

**Using cURL:**
```bash
curl -X POST http://localhost:5000/api/jobsAdd/seed/init
```

**Using PowerShell:**
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/jobsAdd/seed/init" -Method POST -Headers @{"Content-Type"="application/json"}
```

**Response:**
```json
{
  "message": "Successfully seeded 6 jobs",
  "jobs": [...]
}
```

### Step 2: Access the Features

#### Job Listing Page
Visit: `http://localhost:5175/careers`
- Filter jobs by department (All, Engineering, Design, Security, Product, Sales, Marketing, HR)
- Click "View Details →" to navigate to job detail page

#### Job Detail Page
Visit: `http://localhost:5175/careers/{jobId}`
- View complete job information
- See job overview with location, experience, type, department
- Browse responsibilities and requirements
- Learn about ITCS benefits
- Apply directly from the page

## API Endpoints

### Get All Jobs
```
GET http://localhost:5000/api/jobsAdd
```

### Get Specific Job
```
GET http://localhost:5000/api/jobsAdd/{jobId}
```

### Create New Job
```
POST http://localhost:5000/api/jobsAdd
Content-Type: application/json

{
  "title": "Your Job Title",
  "department": "Your Department",
  "type": "Full-time",
  "location": "City",
  "experience": "Required Experience",
  "description": "Job Description"
}
```

### Delete Job
```
DELETE http://localhost:5000/api/jobsAdd/{jobId}
```

### Seed Database (Initialize with 6 jobs)
```
POST http://localhost:5000/api/jobsAdd/seed/init
```

### Clear All Jobs
```
DELETE http://localhost:5000/api/jobsAdd/seed/clear
```

## File Structure

```
src/
├── Components/
│   └── Careers/
│       ├── CareerPositions/
│       │   ├── CareerPositions.jsx (Updated to link to job details)
│       │   └── CareerPositions.scss
│       ├── JobDetail/
│       │   ├── JobDetail.jsx (New: Job detail page component)
│       │   └── JobDetail.scss (New: Theme-matched styling)
│       └── Careers.jsx
├── Backend/
│   ├── data/
│   │   └── jobsSeedData.js (New: Job seed data)
│   ├── models/
│   │   └── job.js (Updated: Job model)
│   └── routes/
│       └── jobs.js (Updated: Added seed endpoints)
└── App.jsx (Updated: Added /careers/:id route)
```

## Features

### Job Detail Page Includes:
- ✅ Hero section with job title and metadata
- ✅ Job overview grid (location, experience, type, department)
- ✅ About the role section
- ✅ Key responsibilities list
- ✅ Requirements cards
- ✅ Why join ITCS section with 6 benefit cards
- ✅ Sticky apply card with contact information
- ✅ Responsive design for all devices
- ✅ Theme-matched colors and styling

### Styling Features:
- Consistent with ITCS website theme
- Uses CSS variables for theming
- Responsive grid layouts
- Smooth hover effects and transitions
- Loading and error states
- Mobile-optimized design

## Troubleshooting

### Jobs not appearing?
1. Make sure backend is running on port 5000
2. Check MongoDB connection
3. Run the seed endpoint: POST `/api/jobsAdd/seed/init`
4. Check browser console for errors

### Job detail page shows error?
1. Verify the job ID in the URL is correct
2. Check if the job exists in database: GET `/api/jobsAdd`
3. Check backend logs for database errors

### Styling not loading?
1. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
2. Check if `.scss` files are properly imported
3. Verify CSS variables are defined in theme

## Next Steps

1. ✅ Seed the database with the 6 jobs
2. ✅ Visit `/careers` to see job listings
3. ✅ Click "View Details" on any job to see the detail page
4. ✅ Test the "Apply Now" button which links to the application form
5. ✅ Customize job descriptions as needed in the admin panel

Enjoy your new job management system! 🚀
