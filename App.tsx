/**
 * HEAL GEMSS - Native Mobile Application (React Native / Expo)
 * Single Source of Truth: https://numerosouravmidya.in (WooCommerce Store API)
 * Business Type: Natural Crystals, Rudraksha, Healing Bracelets, Vastu Products
 * Exclusively Physical Products
 */

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Linking,
  Alert
} from 'react-native';

const WOO_API_ENDPOINT = 'https://numerosouravmidya.in/wp-json/wc/store/v1/products?per_page=100';

interface Product {
  id: number;
  name: string;
  prices: { price: string; regular_price: string; currency_symbol: string };
  images: Array<{ src: string }>;
  categories: Array<{ id: number; name: string; slug: string }>;
  description?: string;
}

export default function NativeApp() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(WOO_API_ENDPOINT);
      const json: Product[] = await res.json();
      // Filter out consultation service product #97 and 'numerology' category
      const physicalOnly = json.filter(p => {
        const catSlugs = (p.categories || []).map(c => c.slug);
        return !catSlugs.includes('numerology') && p.id !== 97;
      });
      setProducts(physicalOnly);
    } catch (err) {
      console.error('WooCommerce fetch error:', err);
      Alert.alert('Connection Error', 'Could not sync with HEAL GEMSS store.');
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppSupport = () => {
    Linking.openURL('https://wa.me/919083125067?text=Hello%20HEAL%20GEMSS');
  };

  const renderProductItem = ({ item }: { item: Product }) => {
    const price = Math.round(Number(item.prices.price) / 100);
    const imgUrl = item.images?.[0]?.src || 'https://numerosouravmidya.in/wp-content/uploads/2026/08/file_000000000ea0720b925b425b7468641a.png';
    const cleanTitle = item.name.replace(/&#8217;/g, "'").replace(/&#038;/g, '&');

    return (
      <View style={styles.card}>
        <Image source={{ uri: imgUrl }} style={styles.cardImage} resizeMode="cover" />
        <View style={styles.cardBody}>
          <Text style={styles.categoryText}>
            {item.categories?.[0]?.name || 'Healing Crystal'}
          </Text>
          <Text style={styles.productName} numberOfLines={2}>
            {cleanTitle}
          </Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceText}>₹{price.toLocaleString('en-IN')}</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setCartCount(c => c + 1)}
            >
              <Text style={styles.addButtonText}>+ Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#042f24" />
      
      {/* Brand Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.brandTitle}>HEAL GEMSS</Text>
          <Text style={styles.brandSubtitle}>Natural Crystals & Rudraksha</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton} onPress={handleWhatsAppSupport}>
            <Text style={styles.iconButtonText}>WA</Text>
          </TouchableOpacity>
          <View style={styles.cartBadge}>
            <Text style={styles.cartText}>Bag ({cartCount})</Text>
          </View>
        </View>
      </View>

      {/* Product List */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#c5a059" />
          <Text style={styles.loadingText}>Synchronizing with WooCommerce...</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={item => String(item.id)}
          renderItem={renderProductItem}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.columnWrapper}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF7F2'
  },
  header: {
    backgroundColor: '#042f24',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#c5a059'
  },
  brandTitle: {
    color: '#FDFBF7',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1.5
  },
  brandSubtitle: {
    color: '#c5a059',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  iconButton: {
    backgroundColor: '#064e3b',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8
  },
  iconButtonText: {
    color: '#34d399',
    fontSize: 11,
    fontWeight: 'bold'
  },
  cartBadge: {
    backgroundColor: '#c5a059',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12
  },
  cartText: {
    color: '#042f24',
    fontSize: 11,
    fontWeight: 'bold'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    marginTop: 12,
    fontSize: 13,
    color: '#042f24',
    fontWeight: '500'
  },
  listContent: {
    padding: 12
  },
  columnWrapper: {
    justifyContent: 'space-between'
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 12,
    width: '48.5%',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E7E5E4'
  },
  cardImage: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#F5F5F4'
  },
  cardBody: {
    padding: 10
  },
  categoryText: {
    fontSize: 10,
    color: '#78716C',
    textTransform: 'uppercase'
  },
  productName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1C1917',
    marginTop: 2,
    minHeight: 32
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8
  },
  priceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#042f24'
  },
  addButton: {
    backgroundColor: '#042f24',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8
  },
  addButtonText: {
    color: '#FDFBF7',
    fontSize: 11,
    fontWeight: 'bold'
  }
});
