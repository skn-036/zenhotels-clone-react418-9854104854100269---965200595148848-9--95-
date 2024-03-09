import { LoadingButton } from '@/components/ui/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import Input from '@/components/ui/custom/form/Input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { LuAlertTriangle } from 'react-icons/lu';
import { CiCircleCheck } from 'react-icons/ci';

import useHttpRequest from '@/hooks/http/useHttpRequest';
import useDeepCompareEffect from '@/hooks/utils/useDeepCompareEffect';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setAccessToken, setAuthUser } from '@/store/reducers/auth';
import * as yup from 'yup';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
  name: yup.string().nullable().required(),
  email: yup.string().email().nullable().required(),
  password: yup.string().min(8).nullable().required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .nullable()
    .required()
});

const Signup = ({ formData, setFormData, setOpen }) => {
  const dispatch = useDispatch();

  const [signupError, setSignupError] = useState(null);

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: { ...formData }
  });

  const { saveData: onSignupRequest, saving: signingUp } = useHttpRequest(
    '/v1/user/auth/signup'
  );

  const updatedFormData = Object.keys(formData).reduce((acc, key) => {
    return { ...acc, [key]: form.watch(key) };
  }, {});

  useDeepCompareEffect(() => {
    setFormData(updatedFormData);
  }, [updatedFormData, setFormData]);

  const onSignup = async (data) => {
    try {
      const response = await onSignupRequest(data, {
        hideToast: true,
        throw: true
      });
      if (response?.access_token) {
        dispatch(
          setAccessToken(response?.access_token ? response?.access_token : null)
        );
        dispatch(setAuthUser(response?.data ? response?.data : null));

        toast.success('Signup successful');
        setFormData(
          Object.keys(formData).reduce((acc, key) => {
            return { ...acc, [key]: '' };
          }, {})
        );
        setOpen(false);
      } else {
        toast.error(
          response?.message ? response?.message : 'Something went wrong'
        );
        setSignupError(response?.message ? response : null);
      }
    } catch (error) {
      setSignupError(error?.response?.data);
    }
  };

  return (
    <Form {...form}>
      <form
        className="w-full space-y-3"
        onSubmit={form.handleSubmit(onSignup)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  label="Name"
                  placeholder="Your name..."
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  label="Email address"
                  placeholder="example@gmail.com"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  label="Password"
                  type="password"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  label="Confirm your password"
                  type="password"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-1">
          <LoadingButton
            type="submit"
            className="w-full h-12 rounded-md"
            loading={signingUp}
          >
            Sign up
          </LoadingButton>
          <span className="text-muted-foreground text-sm">
            or login using social network account
          </span>
        </div>

        {signupError?.message && (
          <Alert
            variant={signupError?.code === 13334 ? 'success' : 'destructive'}
          >
            {signupError?.code === 13334 ? (
              <CiCircleCheck size={24} />
            ) : (
              <LuAlertTriangle size={24} />
            )}
            <AlertTitle>{signupError?.title}</AlertTitle>
            <AlertDescription>{signupError?.message}</AlertDescription>
          </Alert>
        )}
      </form>
    </Form>
  );
};

export default Signup;
