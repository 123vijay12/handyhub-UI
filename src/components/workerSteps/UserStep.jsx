// src/components/workerSteps/UserStep.jsx
import UserDetailsForm from "../forms/UserDetailsForm";

const UserStep = ({ onNext, initialData }) => {
  return (
    <UserDetailsForm
      onSubmit={onNext}
      initialData={initialData}
      submitButtonLabel="Next: Work Details"
    />
  );
};

export default UserStep;
