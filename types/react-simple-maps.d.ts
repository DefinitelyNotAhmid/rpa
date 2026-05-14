declare module "react-simple-maps" {
  import type { CSSProperties, ReactNode } from "react";

  type Coordinates = [number, number];

  interface ComposableMapProps {
    children?: ReactNode;
    projection?: string;
    projectionConfig?: Record<string, unknown>;
    style?: CSSProperties;
    className?: string;
  }

  interface GeographyShape {
    rsmKey: string;
    [key: string]: unknown;
  }

  interface GeographiesProps {
    geography: string | Record<string, unknown>;
    children: (props: { geographies: GeographyShape[] }) => ReactNode;
  }

  interface GeographyProps {
    geography: GeographyShape;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    style?: Record<string, CSSProperties>;
    className?: string;
  }

  interface MarkerProps {
    children?: ReactNode;
    coordinates: Coordinates;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    className?: string;
  }

  export function ComposableMap(props: ComposableMapProps): ReactNode;
  export function Geographies(props: GeographiesProps): ReactNode;
  export function Geography(props: GeographyProps): ReactNode;
  export function Marker(props: MarkerProps): ReactNode;
}
