import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Select, SelectItem, Slider } from "@heroui/react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

interface FilterState {
  cuisineType: string[];
  priceRange: string;
  rating: string;
  location: string;
  openingHours: boolean;
  distance: number;
  searchKeywords: string;
}

const FilterModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [filters, setFilters] = useState<FilterState>({
    cuisineType: [],
    priceRange: "",
    rating: "",
    location: "",
    openingHours: false,
    distance: 5,
    searchKeywords: "",
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement | HTMLSelectElement;

    //   if (type === 'checkbox') {
    //     // Handle checkbox input
    //     setFilters(prevFilters => ({
    //       ...prevFilters,
    //       [name as keyof FilterState]: checked
    //     }));
    //   } else if (type === 'select-one' || type === 'select-multiple') {
    //     // Handle select input
    //     setFilters(prevFilters => ({
    //       ...prevFilters,
    //       [name as keyof FilterState]: value
    //     }));
    //   }
    // };
  };

    const handleSliderChange = (value: number) => {
      setFilters((prevFilters) => ({
        ...prevFilters,
        distance: value,
      }));
    };

    return (
      <>
        <Button className="text-black/90 dark:text-white/90 bg-default-200/50 outline-default-200" onPress={onOpen}>
          Filters
          <AdjustmentsHorizontalIcon className="h-5 w-5" />
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl" isDismissable isKeyboardDismissDisabled={false}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <h2 className="text-2xl font-bold dark:text-white">Filter Results</h2>
                </ModalHeader>
                <ModalBody>
                  {/* Cuisine Type */}
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold dark:text-white">Cuisine Type</h3>
                    <div className="space-y-2">
                      {["Middle Eastern", "South Asian", "Mediterranean"].map((cuisine, index) => (
                        <Checkbox
                          key={index}
                          name="cuisineType"
                          value={cuisine}
                          //   isChecked={filters.cuisineType.includes(cuisine)}
                          onChange={handleFilterChange}
                        >
                          {cuisine}
                        </Checkbox>
                      ))}
                    </div>
                  </div>





                  {/* Location */}
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold dark:text-white">Location</h3>
                    <Input name="location" value={filters.location} onChange={handleFilterChange} placeholder="Enter location" />
                  </div>

                  {/* Opening Hours */}
                  <div className="mb-4">
                    <Checkbox
                      name="openingHours"
                      //    isChecked={filters.openingHours}
                      onChange={handleFilterChange}
                    >
                      Open Now
                    </Checkbox>
                  </div>

                  {/* Distance */}
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold dark:text-white">Distance</h3>
                    <Slider
                      //  min={1}
                      //    max={50}
                      step={1}
                      value={filters.distance}
                      //    onChange={handleSliderChange}
                      aria-label="Distance"
                    />
                    <p className="text-gray-600 dark:text-gray-400">{filters.distance} km</p>
                  </div>

                  {/* Search Keywords */}
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold dark:text-white">Search Keywords</h3>
                    <Input name="searchKeywords" value={filters.searchKeywords} onChange={handleFilterChange} placeholder="Search..." />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Apply Filters
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
};

export default FilterModal;
