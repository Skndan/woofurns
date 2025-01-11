'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { clearCache } from '@/lib/utils/clear-cache';
import apiClient from '@/lib/api/api-client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { EyeClosedIcon } from '@radix-ui/react-icons';
import { Eye } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/auth-provider';

const formSchema = z.object({
  name: z.string(),
  password: z.string(),
  email: z.string().email({ message: 'Enter a valid email address' })
});

const formSchema2 = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z.string(),
});

type SignUpFormValue = z.infer<typeof formSchema>;
type SignInFormValue = z.infer<typeof formSchema2>;

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

  const { signIn } = useAuth();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const [isSignUp, setForm] = useState(false);
  const [eye, setEye] = useState(false);

  async function getSocialLogin(social: string) {
    clearCache();
    var request = {
      "redirectUrl": "http://localhost:3001/callback",
      "idpHint": social
    }

    const response = await apiClient.post(`/v1/auth/social`, request).then((res) => res.data)
    // Open the URL in a new tab
    window.open(response.url, '_self');
  }

  const [loading, startTransition] = useTransition();

  const defaultValues = {
    // email: 'emailtorabbitt@gmail.com',
    // password: '123456'
  };

  const signUpform = useForm<SignUpFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const signInform = useForm<SignInFormValue>({
    resolver: zodResolver(formSchema2),
    defaultValues
  });

  const onSignUpSubmit = async (data: SignUpFormValue) => {
    startTransition(() => {
      clearCache();

      // signIn(data);
      // toast.success('Signed In Successfully!');
    });
  };

  const onSubmit = async (data: SignInFormValue) => {
    startTransition(() => {
      clearCache();
      signIn(data);
      toast.success('Signed In Successfully!');
    });
  };

  return (
    <>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">{isSignUp ? `Create your account` : `Log in to your Account`}</CardTitle>
            <CardDescription>
              {isSignUp ? `Sign up to get started` : `Welcome back! Please log in`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {
              isSignUp ?
                <Form {...signUpform}>
                  <form
                    onSubmit={signUpform.handleSubmit(onSignUpSubmit)}
                    className="w-full space-y-2"
                  >
                    <div className="grid gap-2">
                      <div className="flex flex-col gap-4">
                        <Button variant="outline" className="w-full gap-4" type='button' onClick={async () => {
                          await getSocialLogin("google")
                        }}>
                          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /><path d="M1 1h22v22H1z" fill="none" /></svg>
                          Login with Google
                        </Button>
                      </div>
                      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                        <span className="relative z-10 bg-background px-2 text-muted-foreground">
                          Or continue with
                        </span>
                      </div>
                      <div className="grid gap-4">
                        <FormField
                          control={signUpform.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input
                                  type="name"
                                  placeholder="Enter your name..."
                                  disabled={loading}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={signUpform.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="Enter your email..."
                                  disabled={loading}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={signUpform.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password <span className='text-red-500'>*</span></FormLabel>
                              <FormControl className="relative">
                                <div className="relative">
                                  <Button size={"icon"} variant={"ghost"} tabIndex={3} className='absolute right-0' onClick={(e) => {
                                    e.preventDefault();
                                    setEye(!eye);
                                  }}>
                                    {eye ? <EyeClosedIcon className="top-2.5 h-4 w-4 text-muted-foreground" /> : <Eye className="top-2.5 h-4 w-4 text-muted-foreground" />}
                                  </Button>
                                  <Input
                                    disabled={loading}
                                    type={eye ? 'text' : 'password'}
                                    placeholder="Password"
                                    className="pr-8"
                                    tabIndex={2}
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="w-full">
                          Sign Up
                        </Button>
                      </div>
                      <div className="text-center text-sm">
                        Already have an account?{" "}
                        <Button variant={"link"} className="underline underline-offset-4" type='button' onClick={() => setForm(false)}>
                          Sign In
                        </Button>
                      </div>
                    </div>
                  </form>
                </Form>


                :

                <Form {...signInform}>
                  <form
                    onSubmit={signInform.handleSubmit(onSubmit)}
                    className="w-full space-y-2"
                  >
                    <div className="grid gap-2">
                      <div className="flex flex-col gap-4">
                        <Button variant="outline" className="w-full gap-4" type='button' onClick={async () => {
                          await getSocialLogin("google")
                        }}>
                          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /><path d="M1 1h22v22H1z" fill="none" /></svg>
                          Login with Google
                        </Button>
                      </div>
                      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                        <span className="relative z-10 bg-background px-2 text-muted-foreground">
                          Or continue with.
                        </span>
                      </div>
                      <div className="grid gap-4">
                        <FormField
                          control={signInform.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email <span className='text-red-500'>*</span></FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="Enter your email..."
                                  disabled={loading}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={signInform.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password <span className='text-red-500'>*</span></FormLabel>
                              <FormControl className="relative">
                                <div className="relative">
                                  <Button size={"icon"} variant={"ghost"} tabIndex={3} className='absolute right-0' onClick={(e) => {
                                    e.preventDefault();
                                    setEye(!eye);
                                  }}>
                                    {eye ? <EyeClosedIcon className="top-2.5 h-4 w-4 text-muted-foreground" /> : <Eye className="top-2.5 h-4 w-4 text-muted-foreground" />}
                                  </Button>
                                  <Input
                                    disabled={loading}
                                    type={eye ? 'text' : 'password'}
                                    placeholder="Password"
                                    className="pr-8"
                                    tabIndex={2}
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="w-full">
                          Login
                        </Button>
                      </div>
                      {/* <div className="text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Button variant={"link"} className="underline underline-offset-4" type='button' onClick={() => setForm(true)}>
                          Sign up
                        </Button>
                      </div> */}
                    </div>
                  </form>
                </Form>
            }
          </CardContent>
        </Card>
        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
          By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
          and <a href="#">Privacy Policy</a>.
        </div>
      </div>


      {/* <div className="flex flex-row gap-4">
        <GithubSignInButton />
        <Button
          className="w-full"
          variant="outline"
          type="button"
          onClick={async () => {
            await getSocialLogin("google")
          }}
        >
          <Icons.gitHub className="mr-2 h-4 w-4" />
          Github
        </Button>
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email..."
                    disabled={loading}
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={loading}
            className="ml-auto w-full"
            type="submit"
          >
            Login
          </Button>
        </form>
      </Form> */}
    </>
  );
}
