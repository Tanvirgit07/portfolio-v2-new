"use client";

import { useState } from "react";
import Image from "next/image";

const campaignData = {
  title: "Bringing health to those who need it most",
  organizer: {
    name: "Steve Rogers",
    avatar: "/images/aboutbg.png",
  },
  location: "Berlin, Germany",
  category: "Medical & healing",
  raised: 68543,
  goal: 100000,
  funded: 10,
  donors: 94,
  images: [
    "/images/aboutbg.png",
    "/images/damoImage.jpg",
    "/images/aboutbg.png",
    "/images/aboutbg.png",
  ],
  story: `Happy New Year friends! With my birthday coming up on January 6th, as is yearly tradition, instead of asking for gifts I instead encourage my family, friends and supporters to give the gift of a smile to Filipino children with cleft.

Working alongside Smile Train for 7 years now (6 years of them as their Global Ambassador), I've witnessed their work in over 7 countries first hand - a testament to the ongoing work they do for surgeries, medical support and assistance for individuals with cleft lip in over 90 countries world wide.

Last year, the funds raised through my Smile Train Philippines birthday fundraiser, in addition to my personal donations, we raised over $68,000 to help provide life-changing cleft surgeries for children who need it most. The impact of these surgeries goes far beyond a physical transformation — it restores confidence, opens doors to education, and transforms entire families.`,
  topDonors: [
    {
      id: 1,
      name: "Steve Adam",
      date: "December 21, 2019",
      amount: 12,
      avatar: "/images/aboutbg.png",
    },
    {
      id: 2,
      name: "Guest",
      date: "December 21, 2019",
      amount: 212,
      avatar: "/images/aboutbg.png",
    },
    {
      id: 3,
      name: "Abigail",
      date: "December 21, 2019",
      amount: 860,
      avatar: "/images/aboutbg.png",
    },
  ],
  totalDonors: 125,
};

type Tab = "story" | "updates" | "donors";

export function ViewCampaings() {
  const [activeTab, setActiveTab] = useState<Tab>("story");
  const [showFullStory, setShowFullStory] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const progressPercent = Math.min(
    (campaignData.raised / campaignData.goal) * 100,
    100,
  );

  const storyPreview = campaignData.story.slice(0, 320);

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="mx-auto container px-4 py-[64px] sm:px-6">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-[36px] sm:text-[26px] font-semibold text-[#131313] leading-[150%] mb-2">
            {campaignData.title}
          </h1>
          <p className="text-xs text-gray-500 flex flex-wrap items-center justify-center gap-2">
            <span>Fundraising campaign by</span>
            <a href="#" className="text-blue-500 font-medium hover:underline">
              {campaignData.organizer.name}
            </a>
            <span className="flex items-center gap-1">
              <span>🇩🇪</span>
              {campaignData.location}
            </span>
            <span>•</span>
            <span>{campaignData.category}</span>
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column */}
          <div className="flex-1 min-w-0">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-5 justify-between px-10">
              {(["story", "updates", "donors"] as Tab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 text-[24px] font-medium leading-[150%] capitalize transition-colors border-b-2 -mb-px ${
                    activeTab === tab
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === "story" && (
              <div>
                {/* Main Image */}
                <div
                  className="overflow-hidden mb-3 bg-gray-100 relative"
                  style={{ height: 540 }}
                >
                  <Image
                    width={250}
                    height={140} // further reduced height
                    src={campaignData.images[activeImage]}
                    alt="Campaign"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex items-center gap-2 mb-6">
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    ‹
                  </button>
                  <div className="flex gap-2 overflow-x-auto flex-1">
                    {campaignData.images.slice(1).map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i + 1)}
                        className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                          activeImage === i + 1
                            ? "border-blue-500"
                            : "border-transparent"
                        }`}
                      >
                        <Image
                          width={120}
                          height={80}
                          src={img}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    ›
                  </button>
                </div>

                {/* Raised Amount */}
                <p className="text-[32px] font-semibold text-gray-900 mb-4">
                  US$ {campaignData.raised.toLocaleString()}
                </p>

                {/* Story Text */}
                <div className="text-[20px] text-black leading-[180%] space-y-3 mb-3">
                  {(showFullStory ? campaignData.story : storyPreview + "...")
                    .split("\n\n")
                    .map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                </div>

                <button
                  onClick={() => setShowFullStory((p) => !p)}
                  className="flex items-center gap-1 text-blue-500 text-sm font-medium hover:text-blue-700 transition-colors mb-8"
                >
                  {showFullStory ? "Show less" : "Show more"}
                  <span
                    className={`transition-transform ${showFullStory ? "rotate-180" : ""}`}
                  >
                    ⌄
                  </span>
                </button>

                {/* Organizer */}
                <div className="mb-6">
                  <h3 className="text-base font-semibold text-gray-900 mb-3">
                    Organizer
                  </h3>
                  <div className="border border-[#ACACAC] rounded-xl p-4 flex items-center gap-3">
                    <Image
                      width={50}
                      height={50}
                      src={campaignData.organizer.avatar}
                      alt={campaignData.organizer.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <p className="font-medium text-gray-800">
                      {campaignData.organizer.name}
                    </p>
                  </div>
                </div>

                {/* Top Donors */}
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-3">
                    Top 3 Donors
                  </h3>
                  <div className="space-y-0">
                    {campaignData.topDonors.map((donor, index) => (
                      <div
                        key={donor.id}
                        className={`flex items-center justify-between py-4 mb-4 rounded-md ${
                          index < campaignData.topDonors.length - 1
                            ? "border border-[#ACACAC] px-4"
                            : ""
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Image
                            width={40}
                            height={40}
                            src={donor.avatar}
                            alt={donor.name}
                            className="w-11 h-11 rounded-full object-cover"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {donor.name}
                            </p>
                            <p className="text-xs text-gray-400">
                              {donor.date}
                            </p>
                          </div>
                        </div>
                        <p className="text-base font-semibold text-gray-900">
                          $ {donor.amount.toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "updates" && (
              <div className="text-center py-16 text-gray-400 text-sm">
                No updates yet.
              </div>
            )}

            {activeTab === "donors" && (
              <div className="text-center py-16 text-gray-400 text-sm">
                {campaignData.totalDonors} donors have contributed.
              </div>
            )}
          </div>

          {/* Right Sidebar - Sticky Donation Card */}
          <div className="lg:w-96 mt-16 ">
            <div className="border border-gray-200 p-4 !bg-[#FFFFFF] shadow-[0px_1px_17.4px_0px_#00000040]">
              <p className="lg:text-[48px] md:text-[38px] text-[30px]  font-bold text-gray-900 mb-0.5 text-center">
                US$ {campaignData.raised.toLocaleString()}
              </p>
              <p className="text-xs text-black mb-6 text-center">
                Raised of US$ {campaignData.goal.toLocaleString()} goal
              </p>

              {/* Progress Bar */}
              <div className="h-2 bg-gray-100 rounded-full mb-2 overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                <span>{campaignData.funded}% Funded</span>
                <span>{campaignData.donors}k Donors</span>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors mb-2">
                Donate now
              </button>

              <button className="w-full flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium py-2.5 rounded-lg transition-colors">
                <span>🔗</span> Share with friends
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
