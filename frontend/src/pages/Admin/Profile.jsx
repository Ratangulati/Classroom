import { FiCopy } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { PageHeader, Card, CardHeader, CardBody, Avatar, Button, Badge } from '../../components/ui';

const AdminProfile = () => {
  const { user, school } = useAuth();

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(school.code);
      toast.success('School code copied');
    } catch {
      toast.error('Could not copy — select it manually');
    }
  };

  return (
    <>
      <PageHeader title="Profile" description="Your account and school details" />

      <Card>
        <CardHeader title="Account" />
        <CardBody>
          <div className="flex items-center gap-4">
            <Avatar name={user?.name} size="lg" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-ink">{user?.name}</p>
              <p className="truncate text-sm text-muted">{user?.email}</p>
              <Badge tone="accent" className="mt-1.5">
                Administrator
              </Badge>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader
          title="School"
          description="Teachers and students need this code to sign in"
        />
        <CardBody>
          <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted">Name</dt>
              <dd className="mt-1 text-sm text-ink">{school?.name}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted">Join code</dt>
              <dd className="mt-1 flex items-center gap-2">
                <code className="rounded-md border border-line bg-ground px-2 py-1 font-mono text-sm tracking-widest text-ink">
                  {school?.code}
                </code>
                <Button variant="ghost" size="sm" icon={FiCopy} onClick={copyCode}>
                  Copy
                </Button>
              </dd>
            </div>
          </dl>
        </CardBody>
      </Card>
    </>
  );
};

export default AdminProfile;
