import { FormControl } from '@angular/forms';

export interface SignUpFormGroup {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
}
