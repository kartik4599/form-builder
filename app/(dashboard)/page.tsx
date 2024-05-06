import { getForm, getFormStats } from "@/actions/form";
import { LuView } from "react-icons/lu";
import { HiCursorClick } from "react-icons/hi";
import { BiRightArrowAlt } from "react-icons/bi";
import { TbArrowBounce } from "react-icons/tb";
import { FaWpforms, FaEdit } from "react-icons/fa";
import React, { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import CreateFormBtn from "@/components/CreateFormBtn";
import { Form } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { formatDistance } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface StatsCardsProps {
  data?: Awaited<ReturnType<typeof getFormStats>>;
  loading: boolean;
}

interface StatsCardProps {
  title: string;
  icon: React.ReactNode;
  helperText: string;
  value: string;
  className: string;
  loading?: boolean;
}

const page = () => {
  return (
    <div className="container pt-4">
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatWrapper />
      </Suspense>
      <Separator className="my-6" />
      <h2 className="text-3xl font-bold col-span-2">My Forms</h2>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateFormBtn />
        <Suspense
          fallback={[1, 2].map((i) => (
            <FormCardSkeleton key={i} />
          ))}
        >
          <FormCards />
        </Suspense>
      </div>
    </div>
  );
};

async function CardStatWrapper() {
  const stats = await getFormStats();
  return <StatsCards loading={false} data={stats} />;
}

function StatsCards({ data, loading }: StatsCardsProps) {
  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Forms"
        icon={<LuView className="text-blue-600" />}
        helperText={"All time form visits"}
        value={data?.visits.toLocaleString() || ""}
        loading={loading}
        className={"shadow-md shadow-blue-600"}
      />
      <StatCard
        title="Total submissions"
        icon={<FaWpforms className="text-yellow-600" />}
        helperText={"All time form submissions"}
        value={data?.submissions.toLocaleString() || ""}
        loading={loading}
        className={"shadow-md shadow-yellow-600"}
      />
      <StatCard
        title="Submission rate"
        icon={<HiCursorClick className="text-green-600" />}
        helperText={"Visits that result in form submissions"}
        value={data?.submissionRate.toLocaleString() + "%" || ""}
        loading={loading}
        className={"shadow-md shadow-green-600"}
      />
      <StatCard
        title="Bounce rate"
        icon={<TbArrowBounce className="text-red-600" />}
        helperText={"All time leave without interaction"}
        value={data?.bounceRate.toLocaleString() + "%" || ""}
        loading={loading}
        className={"shadow-md shadow-red-600"}
      />
    </div>
  );
}

export function StatCard({
  title,
  icon,
  helperText,
  value,
  loading,
  className,
}: StatsCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading ? (
            <Skeleton>
              <span className="opacity-0">0</span>
            </Skeleton>
          ) : (
            value
          )}
          <p className="text-xs text-muted-foreground pt-1">{helperText} </p>
        </div>
      </CardContent>
    </Card>
  );
}

function FormCardSkeleton() {
  return <Skeleton className="border-2 border-primary-/20 h-[190px] w-full" />;
}

async function FormCards() {
  const forms = await getForm();

  return (
    <>
      {forms.map((form) => (
        <FormCard form={form} key={form.id} />
      ))}
    </>
  );
}

function FormCard({ form }: { form: Form }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex item-center gap-2 justify-between">
          <span className="truncate font-bold">{form.name}</span>
          {form.publish ? (
            <Badge>Published</Badge>
          ) : (
            <Badge variant={"destructive"}>Draft</Badge>
          )}
        </CardTitle>
        <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
          {formatDistance(form.createdAt, new Date(), { addSuffix: true })}
          {form.publish && (
            <span className="flex items-center gap-2">
              <LuView className="text-muted-foreground" />
              <span>{form.visits}</span>
              <FaWpforms className="text-muted-foreground" />
              <span>{form.submission}</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
        {form.description || "No description"}
      </CardContent>
      <CardFooter>
        {form.publish ? (
          <Button asChild className="w-full mt-2 text-md gap-4">
            <Link href={`/forms/${form.id}`}>
              View submission <BiRightArrowAlt />
            </Link>
          </Button>
        ) : (
          <Button
            asChild
            variant={"secondary"}
            className="w-full mt-2 text-md gap-4"
          >
            <Link href={`/builder/${form.id}`}>
              Edit form <FaEdit />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default page;
