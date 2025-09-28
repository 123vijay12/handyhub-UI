// src/components/workerSteps/WorkStep.jsx
import DynamicForm from "../util/DynamicForm";

const workDetailsForm = {
  title: "Work Details",
  sections: [
    {
      title: "Profession Info",
      fields: [
        { label: "Profession", name: "profession", type: "text", required: true },
        { label: "Experience", name: "experience", type: "text", required: true },
        { label: "Hourly Rate", name: "hourlyRate", type: "number", required: true },
      ],
    },
  ],
  submitButton: { label: "Next: Availability" },
};

const WorkStep = ({ onNext, initialData }) => {
  return (
    <DynamicForm
      config={workDetailsForm}
      onSubmit={onNext}
      initialData={initialData}
    />
  );
};

export default WorkStep;
