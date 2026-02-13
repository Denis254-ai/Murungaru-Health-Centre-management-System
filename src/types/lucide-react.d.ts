declare module 'lucide-react' {
    import { FC, SVGProps } from 'react';
    export interface IconProps extends SVGProps<SVGSVGElement> {
        size?: string | number;
        absoluteStrokeWidth?: boolean;
    }
    export type Icon = FC<IconProps>;
    export const Activity: Icon;
    export const AlertTriangle: Icon;
    export const Bot: Icon;
    export const Bell: Icon;
    export const Calendar: Icon;
    export const ClipboardList: Icon;
    export const Clock: Icon;
    export const Home: Icon;
    export const Loader2: Icon;
    export const MessageSquare: Icon;
    export const Package: Icon;
    export const Pill: Icon;
    export const Search: Icon;
    export const Send: Icon;
    export const User: Icon;
    export const Users: Icon;
    export const X: Icon;
    export const createLucideIcon: (iconName: string, iconNode: unknown[]) => Icon;
}
