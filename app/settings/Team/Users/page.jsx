'use client'

const headData = [
  { label: 'Active Users', count: 1 },
  { label: 'Invited Users', count: 0 },
  { label: 'Inactive Users', count: 0 },
]

const activeUsers = [
  { name: 'Pradeep', email: 'pradeep3chandran@gmail.com', phno: '9687452109', },
]

const page = () => {
  return (
    <div className='p-5 w-full h-full'>
      <div className='h-10 gap-5 flex items-center w-full border-b border-b-gray-100'>
        {headData.map(({ label, count }, index) => (
          <div key={index} className="h-full flex justify-between flex-col">
            <h1 className=''>{label} <span className='bg-green-500 px-1.5 py-0.5 text-[14px] text-white rounded-[50%]'>{count}</span></h1>
            <div className="w-full h-1 rounded-t bg-green-500 mt-2"></div>
          </div>
        ))}

      </div>

      <div className="overflow-x-auto w-full">
        <table className="border border-gray-200 mt-3 min-w-full">
          <thead className="bg-green-200 rounded-t-2xl">
            <tr>
              <td className="border-r border-r-gray-300"><input type="checkbox" /></td>
              <td className="min-w-[150px] border-r border-r-gray-300">NAME</td>
              <td className="min-w-[200px] border-r border-r-gray-300">EMAIL</td>
              <td className="min-w-[150px] border-r border-r-gray-300">PHONE NUMBER</td>
              <td className="min-w-[120px] border-r border-r-gray-300">ROLES</td>
              <td className="min-w-[100px] border-r border-r-gray-300">More</td>
            </tr>
          </thead>

          <tbody>
            {activeUsers.map(({ name, email, phno }, index) => (
              <tr key={index}>
                <td className="border-r border-gray-200"><input type="checkbox" /></td>
                <td className="border-r border-gray-200">{name}</td>
                <td className="border-r border-gray-200">{email}</td>
                <td className="border-r border-gray-200">{phno}</td>
                <td className="border-r border-gray-200"></td>
                <td className="border-r border-gray-200"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default page