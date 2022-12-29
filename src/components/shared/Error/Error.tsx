interface Props {
  errorMessage: string;
}

export const Error = ({ errorMessage }: Props) => (
  <div className="m-4 flex h-full w-full items-center justify-center rounded bg-red-200">
    <h4 className="text-lg text-red-800">
      <em>{errorMessage}</em>
    </h4>
  </div>
);
