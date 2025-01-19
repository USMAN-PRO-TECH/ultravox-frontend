import { useEffect, useState, useMemo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { 
  fetchAssistants, 
  deleteAssistant, 
  removeAssistant
} from '@/store/actions/assistantActions';
import { useRouter } from 'next/navigation';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Button } from "@/components/ui/button"
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
  import { Badge } from "@/components/ui/badge"
  import { Trash2 } from 'lucide-react'
  import type { Assistant } from "@/lib/types/assistants"
  import { DeleteAssistantDialog } from "@/components/assistants/delete-assistant-dialog"
  import { TablePagination } from "../table-pagination"
  import { SearchInput } from "@/components/DashBoard/search-input"
  import { showToast } from '@/lib/toast';
  import { toast } from 'react-hot-toast';
  const DEFAULT_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='M12 8v8'/%3E%3Cpath d='M8 12h8'/%3E%3C/svg%3E";
  
  interface AssistantsTableProps {
    assistants: Assistant[];
    onDelete: (id: string) => void;
  }

  export function AssistantsTable() {
    const dispatch = useAppDispatch();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [assistantToDelete, setAssistantToDelete] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    
    const { assistants, loading, error } = useAppSelector(
      (state) => state.assistants
    );
    const router = useRouter();

    const filteredAssistants = useMemo(() => {
      if (!Array.isArray(assistants) || !assistants.length) return [];
      if (!searchQuery.trim()) return assistants;
      
      const query = searchQuery.toLowerCase().trim();
      
      return assistants.filter((assistant) => {
        if (!assistant) return false;
        
        const name = assistant.name?.toLowerCase() || '';
        const phone = assistant.phoneNumber?.toLowerCase() || '';
        const voice = assistant.voice?.toLowerCase() || '';
        
        return (
          name.includes(query) ||
          phone.includes(query) ||
          voice.includes(query)
        );
      });
    }, [assistants, searchQuery]);

    useEffect(() => {
      dispatch(fetchAssistants());
    }, [dispatch]);

    useEffect(() => {
      setCurrentPage(1);
    }, [searchQuery]);

    useEffect(() => {
      console.log({
        searchQuery,
        assistantsCount: assistants?.length,
        assistantsData: assistants,
        filteredCount: filteredAssistants.length,
        filteredData: filteredAssistants
      });
    }, [searchQuery, assistants, filteredAssistants]);

    const paginatedAssistants = useMemo(() => {
      return filteredAssistants.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
      );
    }, [filteredAssistants, currentPage, rowsPerPage]);

    const totalPages = useMemo(() => 
      Math.ceil(filteredAssistants.length / rowsPerPage),
      [filteredAssistants.length, rowsPerPage]
    );

    const handleSearch = useCallback((value: string) => {
      console.log('Search triggered with:', value);
      setSearchQuery(value);
      setCurrentPage(1);
    }, []);

    const handleDelete = useCallback(async (id: string) => {
      setAssistantToDelete(id);
      setIsDeleteModalOpen(true);
    }, []);

    const handleConfirmDelete = useCallback(async () => {
      if (!assistantToDelete) return;
      
      const loadingToast = showToast.loading("Deleting assistant...");
      setIsDeleting(true);
      try {
        const resultAction = await dispatch(deleteAssistant(assistantToDelete));
        
        if (deleteAssistant.fulfilled.match(resultAction)) {
          toast.dismiss(loadingToast);
          showToast.success("Assistant deleted successfully");
          setIsDeleteModalOpen(false);
          setAssistantToDelete(null);
          await dispatch(fetchAssistants());
        }
      } catch (error) {
        toast.dismiss(loadingToast);
        showToast.error("Failed to delete assistant");
        console.error('Error deleting assistant:', error);
      } finally {
        setIsDeleting(false);
      }
    }, [assistantToDelete, dispatch]);

    const handleRowClick = useCallback((id: string) => {
      router.push(`/assistants/${id}`);
    }, [router]);

    const handleModalClose = useCallback((open: boolean) => {
      setIsDeleteModalOpen(open);
      if (!open) {
        setAssistantToDelete(null);
      }
    }, []);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <>
        <div className="mb-4">
          <SearchInput 
            placeholder="Search by name, phone, or voice..." 
            onChange={handleSearch}
          />
        </div>
        <div className="text-sm text-gray-500 mb-2">
          Total: {assistants?.length || 0} | 
          Filtered: {filteredAssistants.length} | 
          Query: "{searchQuery}"
        </div>
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow key="header">
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>NAME</TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead>PHONENUMBER</TableHead>
                <TableHead>VOICE</TableHead>
                <TableHead>CALLS</TableHead>
                <TableHead className="text-right">ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedAssistants.map((assistant) => (
                <TableRow 
                  key={`assistant-${assistant._id}`}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleRowClick(assistant._id)}
                >
                  <TableCell>
                    <Avatar className="h-8 w-8">
                      <AvatarImage 
                        src={DEFAULT_AVATAR}
                        alt={assistant.name} 
                      />
                      <AvatarFallback>{assistant.name[0]?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{assistant.name}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={assistant.status === 'Active' ? 'default' : 'secondary'}
                    >
                      {assistant.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{assistant.phoneNumber || '-'}</TableCell>
                  <TableCell>{assistant.voice}</TableCell>
                  <TableCell>{assistant.calls}</TableCell>
                  <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(assistant._id)}
                      disabled={isDeleting && assistantToDelete === assistant._id}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                    <DeleteAssistantDialog
                      open={isDeleteModalOpen && assistantToDelete === assistant._id}
                      onOpenChange={handleModalClose}
                      onConfirm={handleConfirmDelete}
                      assistantName={assistant.name}
                      isDeleting={isDeleting}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="border-t px-4 py-2">
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={Array.isArray(assistants) ? assistants.length : 0}
              rowsPerPage={rowsPerPage}
              onPageChange={setCurrentPage}
              onRowsPerPageChange={(rows) => {
                setRowsPerPage(rows);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      </>
    );
  }
  
  