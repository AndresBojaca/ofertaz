type Job = {
  id: number;
  date: string;
  contract: string;
  location: string;
  logo: string;
  Company: {
    name: string,
    logo: string
  }
  role: string;
  position: string;
  level: string;
  skills: Array<any>;
}

export type { Job };