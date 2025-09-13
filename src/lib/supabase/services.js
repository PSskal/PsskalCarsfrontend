import { supabase } from "./server.js"; // Usa client.js para el cliente

export const carService = {
  async getCars() {
    const { data, error } = await supabase.from("cars").select("*");
    if (error) {
      console.error("Error fetching cars:", error);
      return [];
    }
    return data;
  },

  async getCarById(id) {
    const { data, error } = await supabase
      .from("cars")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      console.error("Error fetching car by ID:", error);
      return null;
    }
    return data;
  },

  async getCarByLocation(location) {
    const { data, error } = await supabase
      .from("cars")
      .select("*")
      .eq("location", location);
    if (error) {
      console.error("Error fetching cars by location:", error);
      return [];
    }
    return data;
  },

  async getCarsWithFilters({
    location,
    searchQuery,
    selectedBrands,
    isAutomatic,
    priceRange,
  }) {
    let query = supabase.from("cars").select("*");

    if (location && location !== "All") query = query.eq("location", location);

    if (searchQuery)
      query = query.or(
        `brand.ilike.%${searchQuery}%,model.ilike.%${searchQuery}%`
      );

    if (selectedBrands && selectedBrands[0] !== "All Brand")
      query = query.in("brand", selectedBrands);

    if (isAutomatic) query = query.eq("transmission", "Automatico");

    if (priceRange)
      query = query.gte("price", priceRange[0]).lte("price", priceRange[1]);

    const { data, error } = await query;
    if (error) {
      console.error("Error fetching cars with filters:", error);
      return [];
    }
    return data;
  },
  async getImagesByCarId(carId) {
    const { data, error } = await supabase
      .from("car_images")
      .select("*")
      .eq("car_id", carId);
    if (error) {
      console.error("Error fetching images by car ID:", error);
      return [];
    }
    return data;
  },
};
