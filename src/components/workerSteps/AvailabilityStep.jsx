// src/components/workerSteps/AvailabilityStep.jsx
import DynamicForm from "../util/DynamicForm";

const availabilityForm = {
  title: "Availability",
  sections: [
    {
      title: "Work Area & Availability",
      fields: [
        { label: "Service Area", name: "serviceArea", type: "text", required: true },
        {
          label: "Available",
          name: "available",
          type: "select",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
          required: true,
        },
      ],
    },
  ],
  submitButton: { label: "Submit Profile" },
};

const AvailabilityStep = ({ onNext, initialData }) => {
  return (
    <DynamicForm
      config={availabilityForm}
      onSubmit={onNext}
      initialData={initialData}
    />
  );
};

export default AvailabilityStep;
