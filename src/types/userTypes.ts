export interface UserProps {
  id: string;
  username: string;
  email: string;
  phone_number: string;
  id_card_number: number;
  address: string;
  password: string;
  confirm_password: string;
  profile: string | null;
}

export interface UserLoginProps {
  username: string;
  password: string;
}
