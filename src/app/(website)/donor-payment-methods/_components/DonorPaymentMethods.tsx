'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import jsPDF from 'jspdf';

const completedSteps = [
  { id: 1, label: 'Get Started' },
  { id: 2, label: 'Payment' },
];

export default function DonorPaymentMethods() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const donorName = searchParams.get('donorName') || 'Anonymous';
  const donorEmail = searchParams.get('donorEmail') || '';
  const donorMobile = searchParams.get('donorMobile') || '';
  const donorCity = searchParams.get('donorCity') || '';
  const donorCountry = searchParams.get('donorCountry') || '';
  const amount = searchParams.get('amount') || '0';
  const campaignName = searchParams.get('campaignName') || 'Campaign Donation';

  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleDownloadReceipt = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let y = 20;

    // Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('Donation Receipt', pageWidth / 2, y, { align: 'center' });
    y += 16;

    // Divider
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y, pageWidth - margin, y);
    y += 12;

    // Organization info
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('DonorsChoose Organization', margin, y); y += 6;
    doc.text('info@donorschoose.org', margin, y); y += 6;
    doc.text(`Date: ${date}`, margin, y); y += 14;

    // Donor Information heading
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(0);
    doc.text('Donor Information:', margin, y); y += 8;

    // Donor details
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(50);
    doc.text(`Name:     ${donorName}`, margin + 4, y); y += 7;
    doc.text(`Email:      ${donorEmail}`, margin + 4, y); y += 7;
    doc.text(`Mobile:   ${donorMobile}`, margin + 4, y); y += 7;
    doc.text(`Address: ${donorCity}${donorCity && donorCountry ? ', ' : ''}${donorCountry}`, margin + 4, y); y += 14;

    // Divider
    doc.setDrawColor(220, 220, 220);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;

    // Donation details heading
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(0);
    doc.text('Donation Details:', margin, y); y += 10;

    // Table header
    doc.setFillColor(240, 240, 240);
    doc.rect(margin, y - 5, pageWidth - margin * 2, 10, 'F');
    doc.setFontSize(10);
    doc.setTextColor(80);
    doc.text('Description', margin + 4, y + 2);
    doc.text('Amount', pageWidth - margin - 30, y + 2);
    y += 12;

    // Table row
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(40);
    doc.setFontSize(11);
    doc.text(campaignName, margin + 4, y);
    doc.text(`$${amount}`, pageWidth - margin - 30, y);
    y += 10;

    // Divider
    doc.setDrawColor(200);
    doc.line(margin, y, pageWidth - margin, y);
    y += 8;

    // Total
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Total Amount Donated:', margin + 4, y);
    doc.text(`$${amount}`, pageWidth - margin - 30, y);
    y += 16;

    // Divider
    doc.setDrawColor(220);
    doc.line(margin, y, pageWidth - margin, y);
    y += 12;

    // Footer note
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(120);
    doc.text('This donation is a charitable contribution and may be eligible for tax deductions', margin, y); y += 6;
    doc.text('in accordance with applicable tax laws. Please retain this receipt for your records.', margin, y); y += 6;
    doc.text('Thank you for your generous contribution. Your support helps us continue to provide', margin, y); y += 6;
    doc.text('quality education and improve our facilities.', margin, y); y += 10;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(100);
    doc.text('For inquiries, contact us at: info@donorschoose.org', margin, y);

    doc.save(`donation-receipt-${donorName.replace(/\s+/g, '-')}.pdf`);
  };

  const handleViewCampaigns = () => {
    router.push('/campaigns');
  };

  return (
    <div className="flex flex-col py-10">
      {/* Download Receipt - top right */}
      <div className="flex justify-end px-6 pt-6">
        <button
          onClick={handleDownloadReceipt}
          className="flex items-center gap-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
          </svg>
          Download receipt
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="flex flex-col sm:flex-row items-center gap-12 w-full max-w-6xl">

          {/* Left - Steps completed */}
          <div className="bg-white p-6 w-full sm:w-56 lg:w-[350px] shadow-[0px_1px_17.4px_0px_#00000040] space-y-20">
            {completedSteps.map((step) => (
              <div key={step.id} className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-blue-700 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-800">{step.label}</span>
              </div>
            ))}
          </div>

          {/* Right - Success */}
          <div className="flex flex-col items-center gap-6 flex-1">
            <div className="w-[230px] h-[230px] rounded-full bg-green-600 flex items-center justify-center shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-28 h-28 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-green-600">
              Donation Done
            </h2>

            <button
              onClick={handleViewCampaigns}
              className="w-full sm:w-72 lg:w-[90%] bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold py-3 transition-colors"
            >
              View other campaigns
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}