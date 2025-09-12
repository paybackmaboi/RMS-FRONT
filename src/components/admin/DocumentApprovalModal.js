import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_BASE_URL, getSessionToken } from '../../utils/api';

// The generateDocumentContent function remains the same and is omitted for brevity...
const generateDocumentContent = (request) => {
    if (!request) return '';

    // --- Placeholder data from old code ---
    const personalInfo = { civilStatus: 'Single', dateOfBirth: 'January 23, 2006', placeOfBirth: 'Mandaue City, Cebu', parentGuardian: 'Maria Dela Cruz', permanentAddress: 'Sangi, Cal-oocan, Mandaue City', previousSchool: 'Mandaue City Science High School' };
    const educationalData = { elementary: { name: 'Mabolo Elementary School', year: '2018' }, secondary: { name: 'Cebu Eastern College', year: '2022' } };
    const gradesData = [
        { semester: 'First Year, First Semester', year: '2024-2025', subjects: [ { code: 'IT 111', desc: 'Introduction to Computing', grade: '1.5', units: 3 }, { code: 'GE 1', desc: 'Understanding the Self', grade: '1.2', units: 3 }, { code: 'FIL 1', desc: 'Komunikasyon sa Akademikong Filipino', grade: '1.7', units: 3 }, { code: 'NSTP 1', desc: 'National Service Training Program 1', grade: 'P', units: 3 } ]},
        { semester: 'First Year, Second Semester', year: '2024-2025', subjects: [ { code: 'IT 121', desc: 'Computer Programming 1', grade: '1.8', units: 3 }, { code: 'IT 122', desc: 'Data Structures and Algorithms', grade: '2.0', units: 3 }, { code: 'GE 5', desc: 'Purposive Communication', grade: '1.5', units: 3 }, { code: 'NSTP 2', desc: 'National Service Training Program 2', grade: 'P', units: 3 } ]}
    ];
    const diplomaDetails = { dean: "JAYPEE Y. ZOILO, DBA", schoolDirector: "RANULFO L. VISAYA JR., DevEdD.", registrar: "WENELITO M. LAYSON", president: "LILIAN BENEDICTO-HUAN", graduationDate: "this 26th day of May 2022", specialOrder: "No. 30-346201-0196, s. 2022 dated December 15, 2022" };

    // Helper variables...
    const studentName = request.student ? `${request.student.lastName}, ${request.student.firstName} ${request.student.middleName || ''}`.trim() : 'Juan Dela Cruz';
    const studentIdNumber = request.student?.idNumber || 'N/A';
    const studentCourse = request.student?.studentDetails?.course?.name || 'Bachelor of Science in Information Technology';
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const academicYear = '2024-2025';

    switch (request.documentType.toUpperCase()) {
        
        case 'GOOD MORAL FOR GRADUATES':
            return `
                <style>
                    .good-moral-preview, .good-moral-preview * { font-family: Arial, sans-serif !important; }
                    .good-moral-preview .header-row {
                        display: flex;
                        align-items: center;
                        margin-bottom: 0px;
                    }
                    .print-container {
                    padding:15px;
                    }
                    .good-moral-preview .cert-title {
                        text-align: center;
                        font-size: 20pt;
                        font-weight: bold;
                        margin: 18px 0 10px 0;
                        letter-spacing: 2px;
                        padding: 80px 20px 80px 20px;
                    }
                    .good-moral-preview .date { text-align: right; margin-top: 10px; padding-bottom: 55px; }
                    .good-moral-preview .body-text { line-height: 1.8; text-indent: 40px; margin-top: 20px; font-size: 14pt; text-align: left; }
                    .good-moral-preview .body-text1 { line-height: 1.8; text-indent: 40px; margin-top: 20px; font-size: 14pt; text-align: center; }
                    .good-moral-preview .signature-block { margin-top: 80px; text-align: center; padding: 85px; }
                </style>
                <div class="good-moral-preview">
                    <div class="print-container">
                        <div class="header-row">
                            <div class="headerlogo"><img src="/bcformat.png" alt="Logo" style="width:100%;height:100%"></div>
                        </div>
                        <div class="cert-title">CERTIFICATE OF GOOD MORAL CHARACTER</div>
                        <p class="date">${today}</p>
                        <p class="body-text">THIS IS TO CERTIFY THAT <b>${studentName}</b>, was graduate of the degree of <b>${studentCourse}</b> on "Date Here" with Special
                        Order No. 50-5140101-0135 s. 2025 issued by the Commission on Higher Education on ${today}</p>

                        <p class="body-text1">During his/her stay in Benedicto College, he/she did not commit any infraction against the school's
                        rules and regulations nor was he/she involved in any immoral illegal activity that would mar his/her reputation as a person.</p>

                        <p class="body-text1">This certification is issued upon the request of the above mentioned graduate for <b>${request.purpose}</b> purposes only.</p>
                        <div class="signature-block"><p style="border-bottom:1px solid #222;display:inline-block;padding:0 40px 2px 40px;"><b>WENELITO M. LAYSON</b></p><p>School Registrar</p></div>
                    </div>
                </div>
            `;
    case 'GOOD MORAL FOR NON-GRADUATES':
            return `
                <style>
                    .good-moral-preview, .good-moral-preview * { font-family: Arial, sans-serif !important; }
                    .good-moral-preview .header-row {
                        display: flex;
                        align-items: center;
                        margin-bottom: 0px;
                    }
                    .print-container {
                    padding:15px;
                    }
                    .good-moral-preview .cert-title {
                        text-align: center;
                        font-size: 20pt;
                        font-weight: bold;
                        margin: 18px 0 10px 0;
                        letter-spacing: 2px;
                        padding: 80px 20px 80px 20px;
                    }
                    .good-moral-preview .date { text-align: right; margin-top: 10px; padding-bottom: 55px; }
                    .good-moral-preview .body-text { line-height: 1.8; text-indent: 40px; margin-top: 20px; font-size: 14pt; text-align: left; }
                    .good-moral-preview .body-text1 { line-height: 1.8; text-indent: 40px; margin-top: 20px; font-size: 14pt; text-align: center; }
                    .good-moral-preview .signature-block { margin-top: 80px; text-align: center; padding: 85px; }
                </style>
                <div class="good-moral-preview">
                    <div class="print-container">
                        <div class="header-row">
                            <div class="headerlogo"><img src="/bcformat.png" alt="Logo" style="width:100%;height:100%"></div>
                        </div>
                        <div class="cert-title">CERTIFICATE OF GOOD MORAL CHARACTER</div>
                        <p class="date">${today}</p>
                        <p class="body-text">THIS IS TO CERTIFY THAT <b>${studentName}</b>, was enrolled in the <b>${studentCourse}</b> during the
                        first semester of School Year Here</p>

                        <p class="body-text1">During his/her stay in Benedicto College, he/she did not commit any infraction against the school's
                        rules and regulations nor was he/she involved in any immoral illegal activity that would mar his/her reputation as a person.</p>

                        <p class="body-text1">This certification is issued upon the request of the above mentioned graduate for <b>${request.purpose}</b> purposes only.</p>
                        <div class="signature-block"><p style="border-bottom:1px solid #222;display:inline-block;padding:0 40px 2px 40px;"><b>WENELITO M. LAYSON</b></p><p>School Registrar</p></div>
                    </div>
                </div>
            `;

        case 'GRADE SLIP':
            const currentSemesterGrades = gradesData[0];
            let totalUnits = 0;
            const rowsHtml = currentSemesterGrades.subjects.map(sub => {
                const units = Number(sub.units) || 0;
                totalUnits += units;
                const lec = units >= 4 ? 3 : units; // simple split similar to many curricula
                const lab = units >= 4 ? units - 3 : 0;
                return `<tr>
                            <td class="text-center">${sub.code}</td>
                            <td>${sub.desc}</td>
                            <td class="text-center">${lec}</td>
                            <td class="text-center">${lab}</td>
                            <td class="text-center">${sub.grade}</td>
                        </tr>`;
            }).join('');
            return `
                <style>
                    /* Force Arial across the entire grade slip content */
                    .gradeslip-cert, .gradeslip-cert * { font-family: Arial, sans-serif !important; }
                    /* Add generous page margins for both screen and print */
                    .gradeslip-cert .print-container { 
                        max-width: 8.27in; /* A4 width */
                        margin: 0 auto; 
                        padding: 0.75in; /* comfortable inner margins */
                        box-sizing: border-box;
                    }
                    @media print {
                        @page { margin: 0.5in; }
                        .gradeslip-cert .print-container { padding: 0.5in; }
                    }
                    .gradeslip-cert .header-row { display: flex; align-items: center; margin-bottom: 0; }
                    .gradeslip-cert .headerlogo img { width: 100%; height: 100%; }
                    .gradeslip-cert .cert-title { text-align: center; font-size: 20pt; font-weight: bold; margin: 18px 0 10px 0; letter-spacing: 2px; padding: 80px 20px 40px 20px; }
                    .gradeslip-cert .program-title { text-align: center; font-weight: bold; margin: 10px 0 15px 0; }
                    .gradeslip-cert .info { margin: 0 0 10px 0; }
                    .gradeslip-cert .grades-table { width: 100%; border-collapse: collapse; font-size: 12pt; }
                    .gradeslip-cert .grades-table th, .gradeslip-cert .grades-table td { border: 1px solid #000; padding: 6px 8px; }
                    .gradeslip-cert .grades-table th { text-align: center; }
                    .gradeslip-cert .text-center { text-align: center; }
                    .gradeslip-cert .totals-left { margin-top: 10px; font-size: 12pt; }
                    .gradeslip-cert .footer-note { margin-top: 15px; }
                    .gradeslip-cert .signature-block { margin-top: 40px; text-align: center; padding: 60px 85px 85px 85px; }
                </style>
                <div class="gradeslip-cert">
                    <div class="print-container">
                        <div class="header-row">
                            <div class="headerlogo"><img src="/bcformat.png" alt="Logo"></div>
                        </div>
                        <div class="cert-title">CERTIFICATION</div>
                        <p class="info"><strong>Student Name:</strong> ${studentName}</p>
                        <p class="info"><strong>Student ID:</strong> ${studentIdNumber}</p>
                        <p class="info"><strong>Course:</strong> ${studentCourse}</p>
                        <p class="info"><strong>School Year / Semester:</strong> ${currentSemesterGrades.year} / ${currentSemesterGrades.semester}</p>
                        <div class="program-title">BACHELOR OF SCIENCE IN INFORMATION TECHNOLOGY</div>
                        <table class="grades-table">
                            <thead>
                                <tr>
                                    <th>Subject Code</th>
                                    <th>Descriptive Title</th>
                                    <th>Lec</th>
                                    <th>Lab</th>
                                    <th>Grades</th>
                                </tr>
                            </thead>
                            <tbody>${rowsHtml}</tbody>
                        </table>
                        <div class="totals-left"><strong>Total Units:</strong> ${totalUnits}</div>
                        <p class="footer-note">This certification is issued upon the request of the above-mentioned student for <b>${request.purpose || 'scholarship/application'}</b> purposes only.</p>
                        <p class="footer-note">Issued this ${today} at Mandaue City, Cebu, Philippines.</p>
                        <div class="signature-block">
                            <div style="display:inline-block;text-align:center;">
                                <p style="border-bottom:1px solid #222;display:inline-block;padding:0 40px 2px 40px;"><b>MARIA PERPETUA C. SAURA</b></p>
                                <p style="margin:0;text-align:center;">School Registrar</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        case 'GWA CERTIFICATE':
            return `
                <style>
                    .gwaCert-preview, .gwaCert-preview * { font-family: Arial, sans-serif !important; }
                    .gwaCert-preview .header-row {
                        display: flex;
                        align-items: center;
                        margin-bottom: 0px;
                    }
                    .print-container {
                    padding:15px;
                    }
                    .gwaCert-preview .cert-title {
                        text-align: center;
                        font-size: 20pt;
                        font-weight: bold;
                        margin: 18px 0 10px 0;
                        letter-spacing: 2px;
                        padding: 80px 20px 80px 20px;
                    }
                    .gwaCert-preview .body-text { line-height: 1.8; text-indent: 40px; margin-top: 20px; font-size: 14pt; text-align: left; }
                    .gwaCert-preview .body-text1 { line-height: 1.8; text-indent: 40px; margin-top: 20px; font-size: 14pt; text-align: left; }
                    .gwaCert-preview .signature-block { margin-top: 80px; text-align: center; padding: 85px; }
                </style>
                <div class="gwaCert-preview">
                    <div class="print-container">
                        <div class="header-row">
                            <div class="headerlogo"><img src="/bcformat.png" alt="Logo" style="width:100%;height:100%"></div>
                        </div>
                        <div class="cert-title">CERTIFICATION</div>
                        
                        <p class="body-text">This is to certify that according to the records available in this office, <b>${studentName}</b>, was conferred the degree <b>${studentCourse}</b> 
                        during the graduation ceremony help on "INSERT DATE HERE" with Special Order No. 50-5140101-0135 s. 2025 issued by the Commission on Higher Education on ${today}
                        at the Benedicto College, Inc., Mandaue City, Cebu. This is to certify further that she received a <b>General Weighted Average</b> of <b>"Insert Grade Here"</b></p>

                        <p class="body-text1">This certification is issued upon the request of the above mentioned graduate for <b>${request.purpose}</b> purposes only.</p>

                        <p class="body-text1">Issued on the "INSERT DATE HERE", at Mandaue City,Cebu.</p>
                        <div class="signature-block"><p style="border-bottom:1px solid #222;display:inline-block;padding:0 40px 2px 40px;"><b>WENELITO M. LAYSON</b></p><p>School Registrar</p></div>
                    </div>
                </div>
            `;
        
        case 'TOR':
            const torHTML = `
                <div class="tor-container">
                    <div class="tor-header">
                        <img src="/bc.png" alt="Logo" class="tor-logo">
                        <h2>BENEDICTO COLLEGE</h2><p>A.S. Fortuna Street, Mandaue City 6014, Cebu, Philippines</p>
                        <h3>OFFICIAL TRANSCRIPT OF RECORDS</h3>
                    </div>
                    <table class="info-table">
                        <tr><td colspan="4" class="section-header">PERSONAL INFORMATION</td><td rowspan="6" class="photo-box">1.5x1.5<br>PHOTO</td></tr>
                        <tr><td><strong>NAME:</strong></td><td colspan="3">${studentName.toUpperCase()}</td></tr>
                        <tr><td><strong>ID Number:</strong></td><td>${studentIdNumber}</td><td><strong>Civil Status:</strong></td><td>${personalInfo.civilStatus}</td></tr>
                        <tr><td><strong>Date of Birth:</strong></td><td>${personalInfo.dateOfBirth}</td><td><strong>Place of Birth:</strong></td><td>${personalInfo.placeOfBirth}</td></tr>
                        <tr><td><strong>Parent/Guardian:</strong></td><td colspan="3">${personalInfo.parentGuardian}</td></tr>
                        <tr><td><strong>Permanent Address:</strong></td><td colspan="3">${personalInfo.permanentAddress}</td></tr>
                        <tr><td><strong>Previous School:</strong></td><td colspan="2">${personalInfo.previousSchool}</td><td><strong>Course:</strong></td><td>${studentCourse}</td></tr>
                    </table>
                    <table class="info-table">
                        <tr><td colspan="3" class="section-header">EDUCATIONAL DATA</td></tr>
                        <tr><th>COURSE</th><th>NAME & ADDRESS OF SCHOOL</th><th>DATE GRADUATED</th></tr>
                        <tr><td>Elementary</td><td>${educationalData.elementary.name}</td><td>${educationalData.elementary.year}</td></tr>
                        <tr><td>Secondary</td><td>${educationalData.secondary.name}</td><td>${educationalData.secondary.year}</td></tr>
                    </table>
                    ${gradesData.map(sem => `
                        <div class="semester-grades">
                            <p><strong>${sem.semester}, SY ${sem.year}</strong></p>
                            <table class="grades-table">
                                <thead><tr><th>Code</th><th>Description</th><th>Grade</th><th>Units</th></tr></thead>
                                <tbody>${sem.subjects.map(sub => `<tr><td>${sub.code}</td><td>${sub.desc}</td><td>${sub.grade}</td><td>${sub.units}</td></tr>`).join('')}</tbody>
                            </table>
                        </div>
                    `).join('')}
                    <div class="remarks-section"><p><strong>REMARKS:</strong> FOR EVALUATION PURPOSES ONLY.</p><p class="date-issued"><strong>DATE ISSUED:</strong> ${today}</p></div>
                    <div class="signature-section">
                        <div><p>Prepared by:</p><p class="signature-name">JUSTINE M. SUCGANG</p><p class="signature-title">Records-in-Charge</p></div>
                        <div><p>Certified by:</p><p class="signature-name">WENELITO M. LAYSON</p><p class="signature-title">College Registrar</p></div>
                    </div>
                    <p class="footer-note">Not valid without school seal</p>
                </div>
            `;
            const torCSS = `
                .tor-preview, .tor-preview * { font-family: Arial, sans-serif !important; font-size: 11pt; }
                .tor-preview .tor-container { max-width: 8.5in; margin: auto; padding: 0.5in; }
                .tor-preview .tor-header { text-align: center; margin-bottom: 20px; }
                .tor-preview .tor-logo { width: 70px; height: 70px; margin-bottom: 10px; }
                .tor-preview .tor-header h2, .tor-preview .tor-header h3, .tor-preview .tor-header p { margin: 0; line-height: 1.2; }
                .tor-preview .tor-header h2 { font-size: 16pt; }
                .tor-preview .tor-header h3 { font-size: 14pt; margin-top: 5px; }
                .tor-preview .tor-header p { font-size: 10pt; }
                .tor-preview .info-table, .tor-preview .grades-table { width: 100%; border-collapse: collapse; margin-bottom: 15px; font-size: 10pt; }
                .tor-preview .info-table td, .tor-preview .info-table th { border: 1px solid black; padding: 4px 8px; }
                .tor-preview .info-table th { text-align: center; }
                .tor-preview .grades-table td, .tor-preview .grades-table th { border: 1px solid black; padding: 4px 8px; text-align: left; }
                .tor-preview .grades-table th { text-align: center; background-color: #f2f2f2; }
                .tor-preview .section-header { text-align: center; font-weight: bold; background-color: #f2f2f2; }
                .tor-preview .photo-box { width: 1.5in; height: 1.5in; border: 1px solid black; text-align: center; vertical-align: middle; }
                .tor-preview .semester-grades { margin-top: 15px; page-break-inside: avoid; }
                .tor-preview .semester-grades p { margin: 0 0 5px 0; font-weight: bold; }
                .tor-preview .remarks-section { margin-top: 30px; font-size: 10pt; }
                .tor-preview .date-issued { float: right; }
                .tor-preview .signature-section { display: flex; justify-content: space-between; margin-top: 50px; text-align: center; }
                .tor-preview .signature-section p { margin: 0; }
                .tor-preview .signature-name { font-weight: bold; margin-top: 30px; }
                .tor-preview .signature-title { border-top: 1px solid black; padding-top: 2px; }
                .tor-preview .footer-note { font-style: italic; font-size: 9pt; margin-top: 30px; }
            `;
            return `<style>${torCSS}</style><div class="tor-preview">${torHTML}</div>`;

        case 'DIPLOMA':
            return `
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Old+Standard+TT:wght@400;700&family=Roboto:wght@400;500&display=swap');
                    .diploma-preview { 
                        font-family: 'Times New Roman', serif; 
                        color: #333;
                    }
                    .diploma-container {
                        max-width: 11in;
                        min-height: 8.5in;
                        margin: auto;
                        padding: 1in;
                        text-align: center;
                        border: 10px double #666;
                        background-color: #fcfcfc;
                    }
                    .diploma-header { margin-bottom: 30px; }
                    .diploma-logo { width: 90px; margin-bottom: 10px; }
                    .diploma-header h1 { 
                        font-family: 'Playfair Display', serif;
                        font-size: 28pt;
                        letter-spacing: 2px;
                        margin: 0;
                    }
                    .diploma-header .motto { font-style: italic; margin: 5px 0; }
                    .diploma-header .address { font-size: 10pt; }
                    
                    .diploma-body p { margin: 15px 0; }
                    .salutation { font-family: 'Old Standard TT', serif; font-size: 16pt; }
                    .body-text { font-size: 12pt; line-height: 1.6; text-align: justify; }
                    .last-paragraph { margin-top: 30px; }
                    
                    .student-name {
                        font-family: 'Playfair Display', serif;
                        font-size: 26pt;
                        font-weight: 700;
                        margin: 20px 0 !important;
                    }
                    .degree-intro { font-size: 14pt; }
                    .degree-name {
                        font-family: 'Old Standard TT', serif;
                        font-size: 20pt;
                        font-weight: 700;
                        margin: 20px 0 !important;
                    }
                    .given-at { font-size: 11pt; margin-top: 30px; }

                    .signature-grid {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 20px 50px;
                        margin-top: 50px;
                        text-align: center;
                    }
                    .signature-box { padding-top: 10px; }
                    .signature-name {
                        font-family: 'Roboto', sans-serif;
                        font-weight: 500;
                        font-size: 11pt;
                        margin-bottom: 2px !important;
                    }
                    .signature-title {
                        font-size: 10pt;
                        border-top: 1px solid #333;
                        padding-top: 5px;
                        margin-top: 0 !important;
                    }
                </style>
                <div class="diploma-preview">
                    <div class="diploma-container">
                        <div class="diploma-header">
                            <img src="/bc.png" alt="Logo" class="diploma-logo">
                            <h1>BENEDICTO COLLEGE</h1>
                            <p class="motto">Your Education... Our Mission</p>
                            <p class="address">A.S. Fortuna Street, Bakilid, Mandaue City</p>
                        </div>
                        <div class="diploma-body">
                            <p class="salutation">To All Persons Who May Behold These Present</p>
                            <p class="body-text">
                                Be it known that the Board of Directors of the Benedicto College, by authority of the Republic of the Philippines and upon the recommendation of the Academic Council, confers upon
                            </p>
                            <p class="student-name">${studentName.toUpperCase()}</p>
                            <p class="degree-intro">the Degree of</p>
                            <p class="degree-name">${studentCourse}</p>
                            <p class="body-text">
                                with all the rights, honors, privileges, as well as the obligations and responsibilities thereunto appertaining.
                            </p>
                            <p class="body-text last-paragraph">
                                In witness whereof, the seal of Benedicto College and the signatures of the President, School Director, Department Dean and the Registrar are hereunto affixed.
                            </p>
                            <p class="given-at">
                                Given in Mandaue City, Philippines, ${diplomaDetails.graduationDate}.<br>
                                Special Order (B)(R-VII) ${diplomaDetails.specialOrder}.
                            </p>
                        </div>
                        <div class="signature-grid">
                            <div class="signature-box">
                                <p class="signature-name">${diplomaDetails.dean}</p>
                                <p class="signature-title">Dean, College of Business and Management</p>
                            </div>
                            <div class="signature-box">
                                <p class="signature-name">${diplomaDetails.registrar}</p>
                                <p class="signature-title">Registrar</p>
                            </div>
                            <div class="signature-box">
                                <p class="signature-name">${diplomaDetails.schoolDirector}</p>
                                <p class="signature-title">School Director</p>
                            </div>
                            <div class="signature-box">
                                <p class="signature-name">${diplomaDetails.president}</p>
                                <p class="signature-title">President</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        
        case 'CERTIFICATE OF ENROLLMENT':
            return `
            <style>
                    .certificateofEnrollment-preview, .certificateofEnrollment-preview * { font-family: Arial, sans-serif !important; }
                    .certificateofEnrollment-preview .header-row {
                        display: flex;
                        align-items: center;
                        margin-bottom: 0px;
                    }
                    .print-container {
                    padding:15px;
                    }
                    .certificateofEnrollment-preview .cert-title {
                        text-align: center;
                        font-size: 20pt;
                        font-weight: bold;
                        margin: 18px 0 10px 0;
                        letter-spacing: 2px;
                        padding: 80px 20px 80px 20px;
                    }
                    .certificateofEnrollment-preview .date { text-align: right; margin-top: 10px; padding-bottom: 55px; }
                    .certificateofEnrollment-preview .body-text { line-height: 1.8; text-indent: 40px; margin-top: 20px; font-size: 14pt; text-align: left; }
                    .certificateofEnrollment-preview .body-text1 { line-height: 1.8; text-indent: 40px; margin-top: 20px; font-size: 14pt; text-align: center; }
                    .certificateofEnrollment-preview .signature-block { margin-top: 80px; text-align: right; padding: 85px; }
                </style>
                <div class="certificateofEnrollment-preview">
                    <div class="print-container">
                        <div class="header-row">
                            <div class="headerlogo"><img src="/bcformat.png" alt="Logo" style="width:100%;height:100%"></div>
                        </div>
                        <div class="cert-title">CERTIFICATION</div>
                        
                        <p class="body-text">This is to certify that according to our records <b>${studentName}</b>, is officially enrolled as a "Year lvl here" in the <b>${studentCourse}</b> 
                        program of Benedicto College Inc. this 1st Semester of School Year 2025-2026.</p>


                        <p class="body-text1">This certification is issued upon the request of the above mentioned graduate for <b>${request.purpose}</b> purposes only.</p>

                        <p class="body-text1">Issued this 3rd day of September, 2025 at Mandaue City, Cebu, Philippines.</p>
                        <div class="signature-block">
                            <div style="display:inline-block;text-align:center;">
                                <p style="border-bottom:1px solid #222;display:inline-block;padding:0 40px 2px 40px;"><b>WENELITO M. LAYSON</b></p>
                                <p style="margin:0;text-align:center;">School Registrar</p>
                            </div>
                        </div>
                    </div>
                </div>`

        case 'CERTIFICATE OF GRADUATION':
            return `
            <style>
                    .certificateofGraduation-preview, .certificateofGraduation-preview * { font-family: Arial, sans-serif !important; }
                    .certificateofGraduation-preview .header-row {
                        display: flex;
                        align-items: center;
                        margin-bottom: 0px;
                    }
                    .print-container {
                    padding:15px;
                    }
                    .certificateofGraduation-preview .cert-title {
                        text-align: center;
                        font-size: 20pt;
                        font-weight: bold;
                        margin: 18px 0 10px 0;
                        letter-spacing: 2px;
                        padding: 80px 20px 80px 20px;
                    }
                    .certificateofGraduation-preview .body-text2 { text-align: left; margin-top: 10px; padding-bottom: 25px; font-size: 14pt;}
                    .certificateofGraduation-preview .body-text { line-height: 1.8; text-indent: 40px; margin-top: 20px; font-size: 14pt; text-align: left; }
                    .certificateofGraduation-preview .body-text1 { line-height: 1.8; text-indent: 40px; margin-top: 20px; font-size: 14pt; text-align: center; }
                    .certificateofGraduation-preview .signature-block { margin-top: 80px; text-align: right; padding: 85px; }
                </style>
                <div class="certificateofGraduation-preview">
                    <div class="print-container">
                        <div class="header-row">
                            <div class="headerlogo"><img src="/bcformat.png" alt="Logo" style="width:100%;height:100%"></div>
                        </div>
                        <div class="cert-title">CERTIFICATION</div>
                        <p class="body-text2">To Whom it May Concern:</p>

                        <p class="body-text">This is to certify that <b>${studentName}</b> satisfactorily completed the four-year course
                        in College of Computer Studies at Benedicto College, Inc. leading to the degree of <b>${studentCourse}</b> in accordance 
                        with the policies and standards of the <b>Commission on Higher Education (CHED)</b>, and the requirements prescribed by
                        the institution. The degree was conferred on him/her on "Date of Graduation here".</p>


                        <p class="body-text1">This certification is issued upon the request for <b>${request.purpose}</b> purposes only.</p>

                        <p class="body-text1">Given this 3rd day of September, 2025 at the Benedicto College, Inc. Mandaue City, Cebu.</p>
                        <div class="signature-block">
                            <div style="display:inline-block;text-align:center;">
                                <p style="border-bottom:1px solid #222;display:inline-block;padding:0 40px 2px 40px;"><b>WENELITO M. LAYSON</b></p>
                                <p style="margin:0;text-align:center;">School Registrar</p>
                            </div>
                        </div>
                    </div>
                </div>`
        case 'CERTIFICATE OF GRADUATION WITH HONORS':
            return `
            <style>
                    .certificateofGraduation-preview, .certificateofGraduation-preview * { font-family: Arial, sans-serif !important; }
                    .certificateofGraduation-preview .header-row {
                        display: flex;
                        align-items: center;
                        margin-bottom: 0px;
                    }
                    .print-container {
                    padding:15px;
                    }
                    .certificateofGraduation-preview .cert-title {
                        text-align: center;
                        font-size: 20pt;
                        font-weight: bold;
                        margin: 18px 0 10px 0;
                        letter-spacing: 2px;
                        padding: 80px 20px 80px 20px;
                    }
                    .certificateofGraduation-preview .body-text { line-height: 1.8; text-indent: 40px; margin-top: 20px; font-size: 14pt; text-align: left; }
                    .certificateofGraduation-preview .body-text1 { line-height: 1.8; text-indent: 40px; margin-top: 20px; font-size: 14pt; text-align: left; }
                    .certificateofGraduation-preview .signature-block { margin-top: 80px; text-align: right; padding: 85px; }
                </style>
                <div class="certificateofGraduation-preview">
                    <div class="print-container">
                        <div class="header-row">
                            <div class="headerlogo"><img src="/bcformat.png" alt="Logo" style="width:100%;height:100%"></div>
                        </div>
                        <div class="cert-title">CERTIFICATION</div>

                        <p class="body-text"><b>THIS IS TO CERTIFY</b> that according to the records available in this office,<b>${studentName}</b> was conferred
                        the degree of <b>${studentCourse}</b> on "INSERT DATE HERE" at the Benedicto College A.S Fortuna St. Mandaue City.</p>


                        <p class="body-text1">This is to certify further that she received an academic award for being a "INSERT LATIN HONORS HERE".</p>

                        <p class="body-text1">This certification is issued upon the request of the above mentioned student for whatever legal purposes it may
                        serve him/her.</p>

                         <p class="body-text1">Issued on the "INSERT DATE HERE", at Mandaue City, Cebu.</p>
                        <div class="signature-block">
                            <div style="display:inline-block;text-align:center;">
                                <p style="border-bottom:1px solid #222;display:inline-block;padding:0 40px 2px 40px;"><b>WENELITO M. LAYSON</b></p>
                                <p style="margin:0;text-align:center;">School Registrar</p>
                            </div>
                        </div>
                    </div>
                </div>`
        case 'CERTIFICATE OF TRANSFER CREDENTIALS':
            return `
                <style>
                    .transferCRED-preview { 
                        font-family: Arial, sans-serif; 
                        max-width: 8.5in;
                        margin: 0 auto;
                        padding: 20px;
                    }
                    .transferCRED-preview .header-row {
                        display: flex;
                        align-items: center;
                        margin-bottom: 0px;
                    }
                    .transferCRED-preview .logo {
                        width: 80px;
                        height: 80px;
                        margin-right: 20px;
                    }
                    .transferCRED-preview .college-info {
                        flex: 1;
                    }
                    .transferCRED-preview .college-name {
                        font-size: 24pt;
                        font-weight: bold;
                        color: #1e40af;
                        margin: 0;
                        letter-spacing: 1px;
                    }
                    .transferCRED-preview .motto {
                        font-size: 12pt;
                        font-style: italic;
                        color: #1e40af;
                        margin: 2px 0;
                    }
                    .transferCRED-preview .website {
                        font-size: 10pt;
                        color: #dc2626;
                        margin: 0;
                    }
                    .transferCRED-preview .office-header {
                        text-align: center;
                        font-size: 16pt;
                        font-weight: bold;
                        margin: 20px 0;
                        text-transform: uppercase;
                    }
                    .transferCRED-preview .date-right {
                        text-align: right;
                        font-size: 12pt;
                        margin: 10px 0 20px 0;
                    }
                    .transferCRED-preview .cert-title {
                        text-align: center;
                        font-size: 18pt;
                        font-weight: bold;
                        margin: 20px 0 5px 0;
                        text-transform: uppercase;
                    }
                    .transferCRED-preview .cert-subtitle {
                        text-align: center;
                        font-size: 18pt;
                        font-weight: bold;
                        margin: 0 0 20px 0;
                        text-transform: uppercase;
                    }
                    .transferCRED-preview .salutation {
                        font-size: 14pt;
                        font-weight: bold;
                        margin: 20px 0 10px 0;
                        text-transform: uppercase;
                    }
                    .transferCRED-preview .body-text {
                        font-size: 14pt;
                        line-height: 1.6;
                        text-indent: 40px;
                        margin: 15px 0;
                    }
                    .transferCRED-preview .signature-block {
                        margin-top: 40px;
                        text-align: left;
                    }
                    .transferCRED-preview .signature-block1 {
                        margin-top: 40px;
                        text-align: right;
                    }
                    .transferCRED-preview .signature-name {
                        font-weight: bold;
                        font-size: 14pt;
                        text-transform: uppercase;
                        margin: 0;
                    }
                    .transferCRED-preview .signature-title {
                        font-size: 12pt;
                        margin: 0;
                    }
                    .transferCRED-preview .separator {
                        border-top: 2px solid #000;
                        margin: 40px 0;
                    }
                    .transferCRED-preview .return-slip-title {
                        text-align: center;
                        font-size: 18pt;
                        font-weight: bold;
                        margin: 20px 0;
                        text-transform: uppercase;
                    }
                    .transferCRED-preview .return-date {
                        text-align: right;
                        margin: 10px 0 20px 0;
                    }
                    .transferCRED-preview .return-date input {
                        border: none;
                        border-bottom: 1px solid #000;
                        width: 150px;
                        text-align: center;
                    }
                    .transferCRED-preview .return-address {
                        font-size: 14pt;
                        margin: 20px 0;
                    }
                    .transferCRED-preview .return-address .title {
                        font-weight: bold;
                        text-transform: uppercase;
                        margin-bottom: 5px;
                    }
                    .transferCRED-preview .return-address .address {
                        margin: 0;
                    }
                    .transferCRED-preview .return-salutation {
                        font-size: 14pt;
                        margin: 20px 0 10px 0;
                    }
                    .transferCRED-preview .return-body {
                        font-size: 14pt;
                        line-height: 1.6;
                        text-indent: 40px;
                        margin: 15px 0;
                    }
                    .transferCRED-preview .input-field input {
                        border: none;
                        border-bottom: 1px solid #000;
                        width: 300px;
                        margin-left: 10px;
                    }
                    .transferCRED-preview .return-signature {
                        text-align: right;
                        margin-top: 40px;
                    }
                </style>
                <div class="transferCRED-preview">
                    <!-- Certificate Section -->
                    <div class="header-row">
                            <div class="headerlogo"><img src="/bcformat.png" alt="Logo" style="width:100%;height:100%"></div>
                    </div>
                    
                    <div class="office-header">OFFICE OF THE SCHOOL REGISTRAR</div>
                    <div class="date-right">Date: ${today}</div>
                    
                    <div class="cert-title">CERTIFICATE OF TRANSFER CREDENTIAL</div>
                    <div class="cert-subtitle">(HONORABLE DISMISSAL)</div>
                    
                    <div class="salutation">TO WHOM THIS MAY CONCERN:</div>
                    
                    <p class="body-text">This is to certify that <b>${studentName}</b> is granted transfer credential effective today.</p>
                    <p class="body-text">His/Her Official Transcript of Records (TOR) will be issued upon the receipt of the attached request duly accomplished by the school where he/she will transfer.</p>
                    <div class="signature-block">
                        <p class="signature-name">MARIA PERPETUA C. SAURA</p>
                        <p class="signature-title">School Registrar</p>
                    </div>
                    <!-- Separator Line -->
                    <div class="separator"></div>
                    <!-- Return Slip Section -->
                    <div class="header-row">
                            <div class="headerlogo"><img src="/bcformat.png" alt="Logo" style="width:100%;height:100%"></div>
                    </div>
                    <div class="office-header">OFFICE OF THE SCHOOL REGISTRAR</div>
                    <div class="return-slip-title">RETURN SLIP</div>
                    <div class="return-date">
                    </div>
                    <div class="return-address">
                        <div class="title">THE REGISTRAR</div>
                        <p class="address">BENEDICTO COLLEGE</p>
                        <p class="address">A.S. Fortuna St., Bakilid,</p>
                        <p class="address">Mandaue City, Cebu</p>
                    </div>
                    
                    <div class="return-salutation">Sir/Madam:</div>
                    
                    <p class="return-body">Please send us at your convenience, the Transcript of Records of <b>${studentName}</b> student of <b>${studentCourse}</b> program in your school who is temporarily enrolled with us in the College of __________________.</p>
                    <p class="return-body">Thank you for your cooperation.</p>
                    
                    <div class="input-fields">
                        <div class="input-field">
                            <label>Name of School:_______________________</label>
                        </div>
                        <div class="input-field">
                            <label>Address:__________________________</label>
                        </div>
                    </div>
                    
                     <div class="signature-block1">
                            <div style="display:inline-block;text-align:center;">
                                <label>__________________________</label>
                                <p style="margin:0;text-align:center;">School Registrar</p>
                            </div>
                        </div>
                </div>
            `;

        default:
            return `<div style="font-family: sans-serif; padding: 20px;"><h1 style="color: #dc3545;">Template Not Available</h1><p>A template for "<strong>${request.documentType}</strong>" has not been created.</p></div>`;
    }

};

function DocumentApprovalForm() {
    const { requestId } = useParams();
    const navigate = useNavigate();
    const [request, setRequest] = useState(null);
    const [content, setContent] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    const previewRef = useRef(null);
    const selectionRef = useRef(null);

    useEffect(() => {
        const fetchRequestDetails = async () => {
            if (!requestId) return;
            setLoading(true);
            try {
                // --- FIX: Changed 'Authorization' header to 'X-Session-Token' ---
                const response = await fetch(`${API_BASE_URL}/requests/${requestId}`, { headers: { 'X-Session-Token': getSessionToken() } });
                const data = await response.json();
                if (!response.ok) throw new Error(data.message || 'Failed to fetch');
                setRequest(data);
                setContent(generateDocumentContent(data));
            } catch (err) { setError(err.message); }
            finally { setLoading(false); }
        };
        fetchRequestDetails();
    }, [requestId]);
    
    useEffect(() => {
        if (previewRef.current) {
            previewRef.current.contentEditable = isEditing;
            if (isEditing) {
                previewRef.current.focus();
            }
        }
    }, [isEditing]);

    const saveSelection = () => {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            selectionRef.current = selection.getRangeAt(0);
        }
    };

    const restoreSelection = () => {
        const selection = window.getSelection();
        if (selection && selectionRef.current) {
            selection.removeAllRanges();
            selection.addRange(selectionRef.current);
        }
    };

    const exec = (command, value = null) => {
        restoreSelection();
        document.execCommand('styleWithCSS', false, true);
        document.execCommand(command, false, value);
        saveSelection();
        // Sync content state while editing so Save captures latest
        if (previewRef.current) setContent(previewRef.current.innerHTML);
    };

    // Removed font/size apply helpers per request

    const handleFinalizeAndPrint = async () => {
        if (!request) return;
        try {
            // --- FIX: Changed 'Authorization' header to 'X-Session-Token' ---
            await fetch(`${API_BASE_URL}/requests/${request.id}`, { 
                method: 'PATCH', 
                headers: { 
                    'Content-Type': 'application/json', 
                    'X-Session-Token': getSessionToken() 
                }, 
                body: JSON.stringify({ status: 'ready for pick-up', notes: 'Document is ready.' }) 
            });
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`<html><head><title>Print</title></head><body>${content}</body><script>setTimeout(() => { window.print(); window.close(); }, 250);</script></html>`);
            printWindow.document.close();
            navigate('/admin/requests');
        } catch (err) { alert(`Failed to print: ${err.message}`); }
    };
    
    const handleToggleEdit = () => {
        if (isEditing && previewRef.current) {
            setContent(previewRef.current.innerHTML);
        }
        setIsEditing(!isEditing);
    };
    
    if (loading) return <p className="text-center mt-5">Loading document...</p>;
    if (error) return <div className="alert alert-danger mx-3">Error: {error}</div>;

    return (
        <div className="container-fluid my-4">
            <div className="card shadow-sm">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Approve and Preview: {request?.documentType}</h5>
                    <button className="btn btn-secondary" onClick={() => navigate(-1)}>
                        &larr; Back to Requests
                    </button>
                </div>
                <div className="card-body">
                    {isEditing && (
                        <div className="d-flex align-items-center flex-wrap gap-2 mb-3 p-2 border rounded bg-light">
                            <button type="button" className="btn btn-sm btn-outline-dark me-1 fw-bold" title="Bold" onClick={() => exec('bold')}>B</button>
                            <button type="button" className="btn btn-sm btn-outline-dark me-1 fst-italic" title="Italic" onClick={() => exec('italic')}>I</button>
                            <button type="button" className="btn btn-sm btn-outline-dark me-2 text-decoration-underline" title="Underline" onClick={() => exec('underline')}>U</button>
                            <button type="button" className="btn btn-sm btn-outline-dark me-2" title="Strikethrough" onClick={() => exec('strikeThrough')}>ab</button>
                            <button type="button" className="btn btn-sm btn-outline-dark me-1" title="Subscript" onClick={() => exec('subscript')}>x<sub>2</sub></button>
                            <button type="button" className="btn btn-sm btn-outline-dark me-3" title="Superscript" onClick={() => exec('superscript')}>x<sup>2</sup></button>

                            {/* Alignment controls */}
                            <button type="button" className="btn btn-sm btn-outline-dark" title="Align Left" onClick={() => exec('justifyLeft')}>
                                <i className="fas fa-align-left"></i>
                            </button>
                            <button type="button" className="btn btn-sm btn-outline-dark" title="Align Center" onClick={() => exec('justifyCenter')}>
                                <i className="fas fa-align-center"></i>
                            </button>
                            <button type="button" className="btn btn-sm btn-outline-dark" title="Align Right" onClick={() => exec('justifyRight')}>
                                <i className="fas fa-align-right"></i>
                            </button>
                            <button type="button" className="btn btn-sm btn-outline-dark" title="Justify" onClick={() => exec('justifyFull')}>
                                <i className="fas fa-align-justify"></i>
                            </button>
                        </div>
                    )}
                    <div 
                        ref={previewRef}
                        className="border p-4" 
                        style={{ 
                            minHeight: '60vh', 
                            backgroundColor: '#f8f9fa', 
                            overflow: 'auto',
                            outline: isEditing ? '2px solid #0d6efd' : 'none',
                            cursor: isEditing ? 'text' : 'default'
                        }}
                        onKeyUp={saveSelection}
                        onMouseUp={saveSelection}
                        suppressContentEditableWarning={true}
                        dangerouslySetInnerHTML={{ __html: content }} 
                    />
                </div>
                <div className="card-footer text-end">
                    <button className={`btn me-2 ${isEditing ? 'btn-success' : 'btn-secondary'}`} onClick={handleToggleEdit}>
                        {isEditing ? 'Save Changes' : 'Edit Document'}
                    </button>
                    
                    {!isEditing && (
                        <button className="btn btn-primary" onClick={handleFinalizeAndPrint}>
                            Finalize and Print
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DocumentApprovalForm;