import { getFormById, getFormwithSubmissions } from "@/actions/form";
import { StatCard } from "@/app/(dashboard)/page";
import FormLinkBtn from "@/components/FormLinkBtn";
import VisitBtn from "@/components/VisitBtn";
import { LuView } from "react-icons/lu";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";
import { FaWpforms } from "react-icons/fa";
import { ElementsType, FormElementInstance } from "@/components/FormElements";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistance } from "date-fns";

type Row = { [key: string]: string } & { submittedAt: Date };

const RowCell = ({ type, value }: { value: string; type: ElementsType }) => {
  return <TableCell>{value}</TableCell>;
};

const SubmissionsTable = async ({ id }: { id: number }) => {
  const form = await getFormwithSubmissions(id);
  if (!form) throw new Error("Form not found");

  const formElements = JSON.parse(form.content) as FormElementInstance[];
  const columns: {
    id: string;
    label: string;
    required: boolean;
    type: ElementsType;
  }[] = [];
  const rows: Row[] = [];

  formElements.forEach((element) => {
    switch (element.type) {
      case "TextField": {
        columns.push({
          id: element.id,
          label: element.extraAttributes?.label,
          required: element.extraAttributes?.required,
          type: element.type,
        });
      }
    }
  });

  form.FormSubmissions.forEach((submission) => {
    const content = JSON.parse(submission.content);
    rows.push({
      submittedAt: submission.createdAt,
      ...content,
    });
  });

  return (
    <>
      <h1 className="text-2xl font-bold my-4">Submissions</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.id} className="uppercase">
                  {column.label}
                </TableHead>
              ))}
              <TableHead className="text-muted-foreground text-right uppercase">
                Submitted at
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <RowCell
                    key={column.id}
                    type={column.type}
                    value={row[column.id]}
                  />
                ))}
                <TableCell className="text-muted-foreground text-right">
                  {formatDistance(row.submittedAt, new Date())}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
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
