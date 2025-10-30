import Link from "next/link";

const page = () => {
    return (
        <div className='w-full h-full flex justify-between'>
            <div className=" w-full p-5">
                <Link href="/settings/Business-hours/Edit">
                    <div className='p-8 shadow-8 rounded cursor-pointer hover:shadow-lg! transition-all duration-600'>
                        <div className='flex items-center gap-3 mb-3'>
                            <h1>General working hours</h1>
                            <i className="fa-solid fa-lock"></i>
                            {/* <div className=''><p className='bg-green-200 p-2 rounded border border-green-500 text-green-500'>Default Business Hours</p></div> */}
                        </div>
                        <p className='text-[15px] text-gray-400 mb-1'>Default Business Calender</p>
                        <div className='flex items-center gap-3 text-[14px] text-gray-400'>Asia/Kolkata  <i className="fa-solid fa-circle text-[8px] text-gray-300"></i>  8 groups associated</div>
                    </div>
                </Link>
            </div>

            <div className='w-[30%] h-full p-5 text-[14px] text-gray-400 bg-gray-100 overflow-y-auto scrollbar-color'>
                <div className=''>
                    <h1 className='text-black mb text-[16px]'>Business Hours</h1>
                    <p className='mb-2'>Business Hours give you more control over SLAs in your helpdesk, and when a ticket is due. For example, if your helpdesk works between 9am to 6pm Mon-Fri and a customer logs a ticket at 7pm on Tuesday, the "Due by" timers do not start ticking till Wednesday morning at 9.</p>

                    <h1 className='text-black mb text-[16px]'>Holidays</h1>
                    <p className='mb-2'>Holidays work exactly like business hours. If your helpdesk works between 9am to 6pm Mon-Fri and a customer sends a medium priority ticket at 8pm on Friday with a resolution time of 24 hours, then the ticket Due By time is set as 9am on Tuesday.(not 8pm on Sat)</p>

                    <h1 className='text-black mb text-[16px]'>Multiple Business Hours</h1>
                    <p className='mb-2'>You can also create multiple sets of business hours and holidays, and apply them for specific groups. If you have one support team working on PST and another on GMT, you can let each group have its own set of business hours and holidays.</p>

                    <h1 className='text-black mb text-[16px]'>Note</h1>
                    <p className='mb-2'>Business hours are determined by checking the ticket's assigned group; if a group is present, its business hours apply. If no group is assigned, the general business hours are used.</p>
                </div>
            </div>
        </div>
    )
}

export default page