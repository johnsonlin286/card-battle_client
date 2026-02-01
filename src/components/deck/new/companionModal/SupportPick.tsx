import { useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Loader } from "lucide-react"

import { QUERY_KEYS } from "@/utils/constant"
import { fetchCollectionCards } from "@/services/collections"
import Modal from "@/components/Modal"
import CardPick from "@/components/deck/new/companionModal/CardPick"
import Button from "@/components/Button"

interface SupportPickProps {
  isOpen: boolean,
  onClose: () => void
  onSubmit: (supports: SelectedSupport[]) => void
}

export function SupportPick({ isOpen, onClose, onSubmit }: SupportPickProps) {
  const [selectedSupports, setSelectedSupports] = useState<SelectedSupport[]>([]);

  const { data: supportsData, isLoading: isLoadingSupports } = useQuery({
    queryKey: [QUERY_KEYS.COLLECTION_SUPPORTS],
    queryFn: () => fetchCollectionCards('supports'),
    enabled: isOpen,
  })

  const supports = useMemo(() => {
    if (supportsData) {
      const { success, data } = supportsData as CardsResponse;
      if (success) {
        return data as CardDto[];
      }
    }
    return [];
  }, [supportsData]);

  const handleSelectSupport = ({supportId, quantity}: {supportId: string, quantity: number}) => {
    const selectedSupport = selectedSupports.find((support) => support.support_id === supportId);
    if (selectedSupport) {
      setSelectedSupports(selectedSupports.map((support) => support.support_id === supportId ? { ...support, quantity } : support));
    } else {
      const supportImage = supports.find((support) => support.support_id === supportId)?.image || '';
      setSelectedSupports([...selectedSupports, { support_id: supportId, image: supportImage, quantity }]);
    }
  }

  const submitSelectedSupports = () => {
    onSubmit(selectedSupports);
    onClose();
  }

  if (!isOpen) return null;

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center capitalize">
          Support Pick
        </h2>
        <div className="relative grid grid-cols-2 md:grid-cols-3 gap-2 w-full min-h-64 max-h-[80dvh] overflow-y-auto rounded-2xl shadow-inset p-2.5">
          {isLoadingSupports && (
            <div className="absolute inset-0 flex justify-center items-center">
              <Loader className="w-10 h-10 text-zinc-500 animate-spin" />
            </div>
          )}
          {!isLoadingSupports && supports.length > 0 && supports.map((card) => (
            <CardPick key={card.id} type="support" card={card} maxQuantity={2} onChange={(supportId, quantity) => handleSelectSupport({supportId, quantity})} />
          ))}
        </div>
        <div className="flex justify-end items-center gap-2">
        <Button type="button" color="none" onClick={onClose}>
          Cancel
        </Button>
        <Button type="button" color="primary" onClick={submitSelectedSupports}>
          Save
        </Button>
      </div>
      </div>
    </Modal>
  )
}

export default SupportPick