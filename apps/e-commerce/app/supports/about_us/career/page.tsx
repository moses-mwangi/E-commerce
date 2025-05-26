// app/careers/page.tsx
import Link from "next/link";

const jobOpenings = [
  {
    id: 1,
    title: "Frontend Developer",
    department: "Engineering",
    location: "San Francisco, CA (Remote)",
    type: "Full-time",
  },
  {
    id: 2,
    title: "Customer Support Specialist",
    department: "Customer Service",
    location: "Austin, TX",
    type: "Full-time",
  },
  {
    id: 3,
    title: "Data Scientist",
    department: "Data Analytics",
    location: "New York, NY (Hybrid)",
    type: "Full-time",
  },
  {
    id: 4,
    title: "Logistics Manager",
    department: "Operations",
    location: "Chicago, IL",
    type: "Full-time",
  },
  {
    id: 5,
    title: "Marketing Intern",
    department: "Marketing",
    location: "Remote",
    type: "Internship",
  },
];

export default function Careers() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Careers at Hypermart</h1>
      <p className="text-lg text-gray-600 mb-8">
        Join our team and help shape the future of e-commerce
      </p>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-6">Current Openings</h2>

          <div className="space-y-4">
            {jobOpenings.map((job) => (
              <div
                key={job.id}
                className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
                    <p className="text-gray-600 mb-2">
                      {job.department} • {job.location}
                    </p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {job.type}
                  </span>
                </div>
                <div className="mt-4 flex justify-end">
                  <Link
                    href={`/careers/${job.id}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    View Details & Apply
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="bg-blue-50 p-6 rounded-lg sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Why Join Hypermart?</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Competitive salaries and benefits</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Flexible work arrangements</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Career growth opportunities</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Inclusive and diverse culture</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Impactful work at scale</span>
              </li>
            </ul>

            <div className="mt-6">
              <h3 className="font-semibold mb-2">
                Not seeing your perfect role?
              </h3>
              <Link
                href="/careers/join-talent-network"
                className="text-blue-600 hover:underline"
              >
                Join our talent network
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Life at Hypermart</h2>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-xl font-semibold mb-3">Our Culture</h3>
            <p className="mb-3">
              At Hypermart, we foster a culture of innovation, collaboration,
              and customer obsession. We believe in working hard, having fun,
              and making history.
            </p>
            <p>
              Our core values guide everything we do, from how we work with each
              other to how we serve our customers.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">Benefits & Perks</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Comprehensive health coverage</li>
              <li>401(k) matching</li>
              <li>Paid parental leave</li>
              <li>Employee discounts</li>
              <li>Learning and development programs</li>
              <li>Wellness programs</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-100 aspect-square rounded"></div>
          <div className="bg-gray-100 aspect-square rounded"></div>
          <div className="bg-gray-100 aspect-square rounded"></div>
          <div className="bg-gray-100 aspect-square rounded"></div>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Interview Process</h2>
        <ol className="list-decimal pl-5 space-y-4">
          <li>
            <strong>Application Review:</strong> Our recruiters review your
            application
          </li>
          <li>
            <strong>Recruiter Screen:</strong> 30-minute phone call with a
            recruiter
          </li>
          <li>
            <strong>Technical/Functional Assessment:</strong> Depending on the
            role
          </li>
          <li>
            <strong>Onsite Interviews:</strong> Typically 4-5 interviews with
            team members
          </li>
          <li>
            <strong>Offer:</strong> We make an offer to join our team!
          </li>
        </ol>
        <p className="mt-4 text-gray-600">
          The entire process typically takes 2-4 weeks from application to
          offer.
        </p>
      </div>
    </div>
  );
}
