import { getFormById } from "@/actions/form";
import { StatCard } from "@/app/(dashboard)/page";
import FormLinkBtn from "@/components/FormLinkBtn";
import VisitBtn from "@/components/VisitBtn";
import { LuView } from "react-icons/lu";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";
import { FaWpforms } from "react-icons/fa";

const SubmissionsTable = ({ id }: { id: number }) => {
  return (
    <>
      <h1 className="text-2xl font-bold my-4">Submissions</h1>
    </>
  );
};

const FormDetailPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const form = await getFormById(Number(id));
  if (!form) throw new Error("Form not found");

  const { visits, submission, shareUrl } = form;

  let submissionRate = 0;
  if (visits > 0) {
    submissionRate = (submission / visits) * 100;
  }
  const bounceRate = 100 - submissionRate;

  return (
    <>
      <div className="py-10 border-b border-muted">
        <div className="flex justify-between container">
          <h1 className="test-4xl font-bold truncate">{form.name}</h1>
          <VisitBtn shareUrl={shareUrl} />
        </div>
      </div>
      <div className="py-4 border-b border-muted">
        <div className="flex gap-2 items-center justify-between container">
          <FormLinkBtn shareUrl={shareUrl} />
        </div>
      </div>
      <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container">
        <StatCard
          title="Total Forms"
          icon={<LuView className="text-blue-600" />}
          helperText={"All time form visits"}
          value={visits.toLocaleString() || ""}
          className={"shadow-md shadow-blue-600"}
        />
        <StatCard
          title="Total submissions"
          icon={<FaWpforms className="text-yellow-600" />}
          helperText={"All time form submissions"}
          value={submission.toLocaleString() || ""}
          className={"shadow-md shadow-yellow-600"}
        />
        <StatCard
          title="Submission rate"
          icon={<HiCursorClick className="text-green-600" />}
          helperText={"Visits that result in form submissions"}
          value={submissionRate.toLocaleString() + "%" || ""}
          className={"shadow-md shadow-green-600"}
        />
        <StatCard
          title="Bounce rate"
          icon={<TbArrowBounce className="text-red-600" />}
          helperText={"All time leave without interaction"}
          value={bounceRate.toLocaleString() + "%" || ""}
          className={"shadow-md shadow-red-600"}
        />
      </div>
      <div className="container pt-10">
        <SubmissionsTable id={form.id} />
      </div>
    </>
  );
};

export default FormDetailPage;
