import { Metadata } from 'next';
import Image from 'next/image';
import { LoginForm } from './user-auth-form';
import PageContainer from '@/components/layout/page-container';
import { ScrollArea } from '@/components/ui/scroll-area';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

export default function SignInViewPage() {
  return (
    <ScrollArea className="h-[calc(100dvh)]">
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col items-center gap-6">
          <Image
            src="/woofurns-logo-dark.svg"
            className="hidden pl-3 dark:block"
            width="240"
            height="64"
            alt="Logo"
          />
          <Image
            src="/woofurns-logo-light.svg"
            className="block pl-3 dark:hidden"
            width="240"
            height="64"
            alt="Logo"
          />
          <LoginForm />
        </div>
      </div>
    </ScrollArea>


    // <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
    //   <Link
    //     href="/examples/authentication"
    //     className={cn(
    //       buttonVariants({ variant: 'ghost' }),
    //       'absolute right-4 top-4 hidden md:right-8 md:top-8'
    //     )}
    //   >
    //     Login
    //   </Link>
    //   <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
    //     <div className="absolute inset-0 bg-zinc-900" />
    //     <div className="relative z-20 flex items-center text-lg font-medium">
    //       <Link href={'/dashboard/overview'}>
    //         <Image
    //           src="/rdp-logo.png"
    //           className="hidden pl-3 dark:block"
    //           width="240"
    //           height="64"
    //           alt="Logo"
    //         />
    //         <Image
    //           src="/rdp-logo.png"
    //           className="block pl-3 dark:hidden"
    //           width="240"
    //           height="64"
    //           alt="Logo"
    //         />
    //       </Link>
    //     </div>
    //     <div className="relative z-20 mt-auto">
    //       <blockquote className="space-y-2">
    //         <div>
    //           <h2 className="text-3xl font-bold tracking-tight">
    //             {'StepZero'}
    //           </h2>
    //           <p className="text-xl">
    //             {'The new way to discover and manage your APIs'}
    //           </p>
    //         </div>
    //       </blockquote>
    //     </div>
    //   </div>
    //   <div className="flex h-full items-center p-4 lg:p-8">
    //     <div className="mx-auto flex w-full flex-col justify-center space-y-6 rounded-lg border p-4 sm:w-[380px]">
    //       <div className="flex flex-col space-y-2">
    //         <h1 className="text-2xl font-semibold tracking-tight">Log In</h1>
    //         <p className="text-sm text-muted-foreground">
    //           Enter your email below to log in your account
    //         </p>
    //       </div>
    //       <UserAuthForm />
    //       <p className="px-8 text-center text-sm text-muted-foreground">
    //         By clicking continue, you agree to our{' '}
    //         <Link
    //           href="/terms"
    //           className="underline underline-offset-4 hover:text-primary"
    //         >
    //           Terms of Service
    //         </Link>{' '}
    //         and{' '}
    //         <Link
    //           href="/privacy"
    //           className="underline underline-offset-4 hover:text-primary"
    //         >
    //           Privacy Policy
    //         </Link>
    //         .
    //       </p>
    //     </div>
    //   </div>
    // </div>
  );
}
