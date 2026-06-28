import DocumentCard from "./DocumentCard";

const docs = [
  {
    name: "Aadhaar Card",
    verified: true,
  },
  {
    name: "PAN Card",
    verified: true,
  },
  {
    name: "Income Certificate",
    verified: false,
  },
  {
    name: "Caste Certificate",
    verified: true,
  },
  {
    name: "Bank Passbook",
    verified: false,
  },
  {
    name: "10th Marksheet",
    verified: true,
  },
];

export default function DocumentsGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

      {docs.map((doc) => (

        <DocumentCard
          key={doc.name}
          {...doc}
        />

      ))}

    </div>
  );
}