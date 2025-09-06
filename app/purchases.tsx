import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Package, Calendar } from 'lucide-react-native';
import { useCart } from '@/contexts/CartContext';

export default function PurchasesScreen() {
  const { purchases } = useCart();

  const renderPurchaseItem = ({ item: purchase }: { item: any }) => (
    <View style={styles.purchaseCard}>
      <View style={styles.purchaseHeader}>
        <View style={styles.purchaseInfo}>
          <Text style={styles.purchaseId}>Order #{purchase.id}</Text>
          <View style={styles.purchaseDate}>
            <Calendar size={14} color="#6B7280" />
            <Text style={styles.dateText}>
              {new Date(purchase.date).toLocaleDateString()}
            </Text>
          </View>
        </View>
        <Text style={styles.purchaseTotal}>${purchase.total.toFixed(2)}</Text>
      </View>

      <View style={styles.itemsList}>
        {purchase.items.map((item: any, index: number) => (
          <View key={index} style={styles.purchaseItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.itemDetails}>
                {item.quantity}x ${item.price.toFixed(2)}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.statusContainer}>
        <View style={[styles.statusBadge, styles[`status${purchase.status}`]]}>
          <Text style={[styles.statusText, styles[`statusText${purchase.status}`]]}>
            {purchase.status.charAt(0).toUpperCase() + purchase.status.slice(1)}
          </Text>
        </View>
      </View>
    </View>
  );

  if (purchases.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color="#1F2937" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Purchase History</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.emptyState}>
          <Package size={64} color="#9CA3AF" />
          <Text style={styles.emptyTitle}>No purchases yet</Text>
          <Text style={styles.emptySubtitle}>
            Your purchase history will appear here after you make your first order
          </Text>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push('/(tabs)')}
          >
            <Text style={styles.primaryButtonText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Purchase History</Text>
        <View style={styles.placeholder} />
      </View>

      <FlatList
        data={purchases}
        renderItem={renderPurchaseItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.purchasesList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  placeholder: {
    width: 40,
  },
  purchasesList: {
    padding: 16,
  },
  purchaseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  purchaseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  purchaseInfo: {
    flex: 1,
  },
  purchaseId: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  purchaseDate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  purchaseTotal: {
    fontSize: 18,
    fontWeight: '700',
    color: '#10B981',
  },
  itemsList: {
    marginBottom: 16,
  },
  purchaseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  itemInfo: {
    marginLeft: 12,
    flex: 1,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  itemDetails: {
    fontSize: 12,
    color: '#6B7280',
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statuscompleted: {
    backgroundColor: '#D1FAE5',
  },
  statusTextcompleted: {
    color: '#065F46',
  },
  statuspending: {
    backgroundColor: '#FEF3C7',
  },
  statusTextpending: {
    color: '#92400E',
  },
  statuscancelled: {
    backgroundColor: '#FEE2E2',
  },
  statusTextcancelled: {
    color: '#991B1B',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});