'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { collection, getDocs, doc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { UserProfile } from '@/lib/userProfile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Loader2, Plus, UserCheck, UserX } from 'lucide-react';

export default function UsersPage() {
  const { userProfile, loading } = useAuth();
  const router = useRouter();
  
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [fetching, setFetching] = useState(true);
  const [invitePhone, setInvitePhone] = useState('');
  const [inviteName, setInviteName] = useState('');
  const [inviteLocation, setInviteLocation] = useState('');
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviting, setInviting] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!loading && userProfile?.userType !== 'partner') {
      router.replace('/dashboard');
    }
  }, [loading, userProfile, router]);

  const fetchUsers = async () => {
    setFetching(true);
    try {
      const snapshot = await getDocs(collection(db, 'users'));
      const usersData: UserProfile[] = [];
      snapshot.forEach((doc) => {
        usersData.push(doc.data() as UserProfile);
      });
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (userProfile?.userType === 'partner') {
      fetchUsers();
    }
  }, [userProfile]);

  const handleApprove = async (uid: string) => {
    try {
      await updateDoc(doc(db, 'users', uid), {
        approvalStatus: 'approved'
      });
      setUsers(users.map(u => u.uid === uid ? { ...u, approvalStatus: 'approved' } : u));
    } catch (error) {
      console.error('Error approving user:', error);
    }
  };

  const handleReject = async (uid: string) => {
    try {
      await updateDoc(doc(db, 'users', uid), {
        approvalStatus: 'rejected'
      });
      setUsers(users.map(u => u.uid === uid ? { ...u, approvalStatus: 'rejected' } : u));
    } catch (error) {
      console.error('Error rejecting user:', error);
    }
  };

  const handleInvitePartner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!invitePhone || !inviteName) return;
    
    setInviting(true);
    try {
      // Create partner_invites document
      await setDoc(doc(db, 'partner_invites', invitePhone), {
        fullName: inviteName,
        location: inviteLocation,
        addedBy: userProfile?.uid,
        createdAt: new Date().toISOString()
      });
      
      setInviteOpen(false);
      setInvitePhone('');
      setInviteName('');
      setInviteLocation('');
      alert('Partner invited successfully. They can now sign in using their phone number.');
    } catch (error) {
      console.error('Error inviting partner:', error);
      alert('Failed to invite partner.');
    } finally {
      setInviting(false);
    }
  };

  if (loading || fetching) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const filteredUsers = filter === 'all' ? users : users.filter(u => u.userType === filter);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground mt-1">Manage platform users, approve investors, and invite partners.</p>
        </div>
        
        <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Invite Partner
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite New Partner</DialogTitle>
              <DialogDescription>
                Send an invite to a new partner. They will be able to log in directly using this phone number.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleInvitePartner} className="space-y-4 pt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number (with country code)</label>
                <Input 
                  placeholder="+919999999999" 
                  value={invitePhone} 
                  onChange={(e) => setInvitePhone(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input 
                  placeholder="John Doe" 
                  value={inviteName} 
                  onChange={(e) => setInviteName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input 
                  placeholder="Pune, Maharashtra" 
                  value={inviteLocation} 
                  onChange={(e) => setInviteLocation(e.target.value)}
                />
              </div>
              <DialogFooter className="pt-4">
                <Button variant="outline" type="button" onClick={() => setInviteOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={inviting}>
                  {inviting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Send Invite
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" value={filter} onValueChange={setFilter}>
        <TabsList>
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value="farmer">Farmers</TabsTrigger>
          <TabsTrigger value="investor">Investors</TabsTrigger>
          <TabsTrigger value="partner">Partners</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="border rounded-lg bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((u) => (
                <TableRow key={u.uid}>
                  <TableCell className="font-medium">{u.fullName}</TableCell>
                  <TableCell>{u.phoneNumber}</TableCell>
                  <TableCell className="capitalize">{u.userType}</TableCell>
                  <TableCell>{u.location || '-'}</TableCell>
                  <TableCell>
                    {u.approvalStatus === 'approved' ? (
                      <Badge variant="default" className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20">Approved</Badge>
                    ) : u.approvalStatus === 'rejected' ? (
                      <Badge variant="destructive">Rejected</Badge>
                    ) : u.approvalStatus === 'pending' ? (
                      <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-200">Pending</Badge>
                    ) : (
                      <Badge variant="secondary">Approved</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {u.userType === 'investor' && u.approvalStatus === 'pending' && (
                      <div className="flex items-center justify-end gap-2">
                        <Button size="sm" variant="outline" className="h-8 border-emerald-200 text-emerald-600 hover:bg-emerald-50" onClick={() => handleApprove(u.uid)}>
                          <UserCheck className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 border-red-200 text-red-600 hover:bg-red-50" onClick={() => handleReject(u.uid)}>
                          <UserX className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
