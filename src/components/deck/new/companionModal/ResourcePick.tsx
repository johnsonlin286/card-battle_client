import { useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Loader } from "lucide-react"

import { QUERY_KEYS } from "@/utils/constant"
import { fetchCollectionCards } from "@/services/collections"
import Modal from "@/components/Modal"
import CardPick from "@/components/deck/new/companionModal/CardPick"
import Button from "@/components/Button"

interface ResourcePickProps {
  isOpen: boolean,
  onClose: () => void
  onSubmit: (resources: SelectedResource[]) => void
}

export function ResourcePick({ isOpen, onClose, onSubmit }: ResourcePickProps) {
  const [selectedResources, setSelectedResources] = useState<SelectedResource[]>([]);

  const { data: resourcesData, isLoading: isLoadingResources } = useQuery({
    queryKey: [QUERY_KEYS.COLLECTION_RESOURCES],
    queryFn: () => fetchCollectionCards('resources'),
    enabled: isOpen,
  })

  const resources = useMemo(() => {
    if (resourcesData) {
      const { success, data } = resourcesData as CardsResponse;
      if (success) {
        return data as CardDto[];
      }
    }
    return [];
  }, [resourcesData]);

  const handleSelectResource = ({ resourceId, quantity }: { resourceId: string, quantity: number }) => {
    const selectedResource = selectedResources.find((resource) => resource.resource_id === resourceId);
    if (selectedResource) {
      setSelectedResources(selectedResources.map((resource) => resource.resource_id === resourceId ? { ...resource, quantity } : resource));
    } else {
      const resourceImage = resources.find((resource) => resource.resource_id === resourceId)?.image || '';
      setSelectedResources([...selectedResources, { resource_id: resourceId, image: resourceImage, quantity }]);
    }
  }

  const submitSelectedResources = () => {
    onSubmit(selectedResources);
    onClose();
  }

  if (!isOpen) return null;

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center capitalize">
          Resource Pick
        </h2>
        <div className="relative grid grid-cols-2 md:grid-cols-3 gap-2 w-full min-h-64 max-h-[60dvh] overflow-y-auto rounded-2xl shadow-inset p-2.5">
          {isLoadingResources && (
            <div className="absolute inset-0 flex justify-center items-center">
              <Loader className="w-10 h-10 text-zinc-500 animate-spin" />
            </div>
          )}
          {!isLoadingResources && resources.length > 0 && resources.map((resource) => (
            <CardPick key={resource.id} type="resource" card={resource} maxQuantity={2} onChange={(resourceId, quantity) => handleSelectResource({ resourceId, quantity })} />
          ))}
        </div>
      </div>
      <div className="flex justify-end items-center gap-2">
        <Button type="button" color="none" onClick={onClose}>
          Cancel
        </Button>
        <Button type="button" color="primary" onClick={submitSelectedResources}>
          Save
        </Button>
      </div>
    </Modal>
  )
}

export default ResourcePick