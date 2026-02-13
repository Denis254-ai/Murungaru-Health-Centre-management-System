import { DashboardWrapper } from '@/components/layout/wrapper';

export default function StaffLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <DashboardWrapper>{children}</DashboardWrapper>;
}
