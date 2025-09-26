
export default function AdditionalQuestions() {
    return (
        <div className="flex flex-col lg:flex-row gap-6 mt-2">
            {/* Left side */}
            <div className="flex-1 space-y-4">
                {/* Personal Details */}
                <div className="bg-white shadow-sm p-4 rounded-lg">
                    <h3 className="font-semibold mb-4">Personal Details</h3>

                    <div className="grid grid-cols-2 text-sm gap-3">
                        <div className="text-gray-500 font-normal">Do you have children? - <span className="text-black">Yes</span></div>
                    </div>
                </div>

                {/* Roles and Compensation */}
                <div className="bg-white shadow-sm p-4 rounded-lg">
                    <h3 className="font-semibold mb-4">Roles and Compensation</h3>
                    <div className="grid grid-cols-2 text-sm gap-3">
                        <div className="text-gray-500 font-normal">Do you have concerns about working hours? - <span className="text-black">Yes</span></div>
                        <div className="text-gray-500 font-normal">Do you understand the role & responsibilities? - <span className="text-black">Yes</span></div>
                        <div className="text-gray-500 font-normal">Do you have any questions about the offered rate? - <span className="text-black">Yes</span></div>
                        <div className="text-gray-500 font-normal">Are you legally allowed to work as a freelancer/contractor? - <span className="text-black">Yes</span></div>
                    </div>
                </div>

                {/* Experience and Commitments */}
                <div className="bg-white shadow-sm p-4 rounded-lg">
                    <h3 className="font-semibold mb-4">Experience and Commitments</h3>
                    <div className="grid grid-cols-2 text-sm gap-3">
                        <div className="text-gray-500 font-normal">Do you have any active work commitments or projects with others? - <span className="text-black">Yes</span></div>
                        <div className="text-gray-500 font-normal">Are you waiting for interview results from other companies? - <span className="text-black">Yes</span></div>
                        <div className="text-gray-500 font-normal">Are you open to working with an additional client or more than 40 hours/week? - <span className="text-black">Yes</span></div>
                    </div>
                </div>

                {/* Certifications and Qualifications */}
                <div className="bg-white shadow-sm p-4 rounded-lg">
                    <h3 className="font-semibold mb-4">Certifications and Qualifications</h3>
                    <div className="grid grid-cols-2 text-sm gap-3">
                        <div className="text-gray-500 font-normal">Do you have required certifications? - <span className="text-black">Yes</span></div>
                    </div>
                </div>

                {/* Device and Work Setup */}
                <div className="bg-white shadow-sm p-4 rounded-lg">
                    <h3 className="font-semibold mb-4">Device and Work Setup</h3>
                    <div className="grid grid-cols-2 text-sm gap-3">
                        <div className="text-gray-500 font-normal">Do you confirm your understanding of remote work requirements? - <span className="text-black">Yes</span></div>
                    </div>
                </div>

                {/* Bank and Payment Details */}
                <div className="bg-white shadow-sm p-4 rounded-lg">
                    <h3 className="font-semibold mb-4">Bank and Payment Details</h3>
                    <div className="grid grid-cols-2 text-sm gap-3">
                        <div className="text-gray-500 font-normal">Are you okay with payouts on the 7th and 22nd of each month? - <span className="text-black">Yes</span></div>
                        <div className="text-gray-500 font-normal">Would you like to participate in our bonus/referral program? - <span className="text-black">Yes</span></div>
                    </div>
                </div>

                {/* Background Check and References */}
                <div className="bg-white shadow-sm p-4 rounded-lg">
                    <h3 className="font-semibold mb-4">Background Check and References</h3>
                    <div className="grid grid-cols-2 text-sm gap-3">
                        <div className="text-gray-500 font-normal">Do you consent to a background check? - <span className="text-black">Yes</span></div>
                    </div>
                </div>
            </div>


        </div>
    );
}
