import { useState } from 'react';
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

import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useDeepCompareEffect from '@/hooks/utils/useDeepCompareEffect';
import useHttpRequest from '@/hooks/http/useHttpRequest';

import { useDispatch } from 'react-redux';
import { setAuthUser, setAccessToken } from '@/store/reducers/auth';
import { toast } from 'react-toastify';

const schema = object().shape({
  email: string().email().nullable().required(),
  password: string().min(8).nullable().required()
});

const Login = ({ formData, setFormData, setOpen }) => {
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState(null);

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...formData
    }
  });

  const { saveData, saving } = useHttpRequest('/v1/user/auth/login');

  const onLogin = async (data) => {
    try {
      const response = await saveData(data, { hideToast: true, throw: true });
      if (response?.access_token) {
        dispatch(
          setAccessToken(response?.access_token ? response?.access_token : null)
        );
        dispatch(setAuthUser(response?.data ? response?.data : null));

        toast.success('Login successful');

        setFormData(
          Object.keys(formData).reduce((acc, key) => {
            return { ...acc, [key]: '' };
          }, {})
        );
        setLoginError(null);

        // hide the popover;
        setOpen(false);
      } else {
        toast.error(
          response?.message ? response?.message : 'Something went wrong'
        );
        setLoginError(response?.message ? response : null);
      }
    } catch (error) {
      console.log(error?.response?.data, 'data');
      setLoginError(error?.response?.data);
    }
  };

  const updatedFormData = Object.keys(formData).reduce((acc, key) => {
    return { ...acc, [key]: form.watch(key) };
  }, {});

  useDeepCompareEffect(() => {
    setFormData({ ...updatedFormData });
  }, [setFormData, updatedFormData]);

  return (
    <Form {...form}>
      <form
        className="w-full space-y-3"
        onSubmit={form.handleSubmit(onLogin)}
      >
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
                  placeholder="********"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex-center text-link hover:underline cursor-pointer">
          Forget your password?
        </div>

        <div className="space-y-1">
          <LoadingButton
            type="submit"
            className="w-full h-12 rounded-md"
            loading={saving}
          >
            Submit
          </LoadingButton>
          <span className="text-muted-foreground text-sm">
            or login using social network account
          </span>
        </div>

        {loginError?.message && (
          <Alert
            variant={loginError?.code === 13334 ? 'success' : 'destructive'}
          >
            {loginError?.code === 13334 ? (
              <CiCircleCheck size={24} />
            ) : (
              <LuAlertTriangle size={24} />
            )}
            <AlertTitle>{loginError?.title}</AlertTitle>
            <AlertDescription>{loginError?.message}</AlertDescription>
          </Alert>
        )}
      </form>
    </Form>
  );
};

export default Login;
