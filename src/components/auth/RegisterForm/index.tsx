import FormInput from "../FormInput";

export default function RegisterForm() {
  return (
    <form className="w-full">
      <div className="flex flex-col gap-2 my-3">
        {formFields.map((field) => (
          <FormInput
            key={field.placeholder}
            placeholder={field.placeholder}
            type={field.type}
          />
        ))}
      </div>

      <button className="bg-primary text-white rounded-lg py-2 px-3 w-full font-bold text-lg hover:scale-105 transition-all">
        Cadastrar
      </button>
    </form>
  );
}

const formFields: { type: string; placeholder: string }[] = [
  {
    placeholder: "Nome",
    type: "text",
  },
  {
    placeholder: "E-mail",
    type: "email",
  },
  {
    placeholder: "Senha",
    type: "password",
  },
  {
    placeholder: "Confirme sua senha",
    type: "password",
  },
];
