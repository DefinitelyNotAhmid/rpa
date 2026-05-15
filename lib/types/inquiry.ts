export type InquiryTopic =
  | "Tuition & Fees"
  | "Uniforms"
  | "Transcript Request"
  | "Admissions"
  | "General";

export type ThreadStatus = "open" | "in_progress" | "resolved";

export interface InquiryThread {
  id: string;
  name: string;
  email: string;
  topic: InquiryTopic;
  status: ThreadStatus;
  created_at: string;
}

export interface InquiryMessage {
  id: string;
  thread_id: string;
  sender: "parent" | "csr";
  body: string;
  created_at: string;
}

export interface CsrEmail {
  id: string;
  thread_id: string;
  folder: "inbox" | "sent";
  from_address: string;
  to_address: string;
  subject: string;
  body: string;
  is_read: boolean;
  created_at: string;
}
