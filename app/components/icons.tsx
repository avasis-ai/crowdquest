import type { SVGProps } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  CircleCheckBig,
  CircleHelp,
  Clock3,
  ExternalLink,
  Goal,
  Info,
  Minus,
  Play,
  Radio,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Trophy,
  Target,
  Users,
  WalletCards,
  Zap,
} from "lucide-react";

const icons = {
  arrow: ArrowRight,
  "arrow-left": ArrowLeft,
  bolt: Zap,
  check: Check,
  "circle-check": CircleCheckBig,
  clock: Clock3,
  external: ExternalLink,
  goal: Goal,
  help: CircleHelp,
  info: Info,
  minus: Minus,
  play: Play,
  radio: Radio,
  refresh: RefreshCw,
  shield: ShieldCheck,
  spark: Sparkles,
  trophy: Trophy,
  target: Target,
  users: Users,
  wallet: WalletCards,
};

export function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: string }) {
  const Component = icons[name as keyof typeof icons] ?? CircleHelp;
  return <Component aria-hidden="true" {...props} />;
}
