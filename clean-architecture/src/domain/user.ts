// here 2. domain layer - 이 안에서 핵심 데이터 타입들을 관리

export type UserName = string;
export type User = {
  id: UniqueId;
  name: UserName;
  email: Email;
  preferences: Ingredient[];
  allergies: Ingredient[];
};
