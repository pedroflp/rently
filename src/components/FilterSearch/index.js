import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';

import { Button } from '../Button';

import { colors } from '../../style/colors';
import { styles } from './styles';

const FilterSearch = ({
  types,
  categories,
  typeFilter,
  categoryFilter,
  setTypeFilter,
  setCategoryFilter,
  handleFilterSearch,
  setFilterModalIsOpened,
  filteredSearch,
  setFilteredSearch,
}) => {
  return (
    <View style={styles.filterModal}>
      <Text style={styles.filterModalTitle}>Filtros de busca</Text>

      <View style={styles.filterModalOptionContainer}>
        <Text style={styles.filterModalOptionContainerLabel}>Tipo</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {types.map((type, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.filterRadioOption, { borderColor: typeFilter === type.value ? colors.main : 'transparent' }]}
              onPress={() => setTypeFilter(prevFilter => prevFilter === type.value ? null : type.value)}>
              <View style={styles.optionRadio}
              >
                {typeFilter === type.value && <View style={styles.optionRadioChecked} />}
              </View>
              <Text style={styles.filterRadioOptionText}>{type.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.filterModalOptionContainer}>
        <Text style={styles.filterModalOptionContainerLabel}>Categoria</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.filterRadioOption, { borderColor: categoryFilter === category.value ? colors.main : 'transparent' }]}
              onPress={() => setCategoryFilter(prevFilter => prevFilter === category.value ? null : category.value)}
            >
              <View style={styles.optionRadio}>
                {categoryFilter === category.value && <View style={styles.optionRadioChecked} />}
              </View>
              <Text style={styles.filterRadioOptionText}>{category.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* <View style={styles.filterModalOptionContainer}>
            <Text style={styles.filterModalOptionContainerLabel}>Valor</Text>

          </View> */}

      <View>
        <Button
          buttonText="Filtrar"
          backgroundColor={colors.black.main}
          textColor={colors.grey.lighter}
          onPress={handleFilterSearch}
          customStyles={{ width: "100%" }}
          disabled={
            !typeFilter &&
            !categoryFilter
          }
        />
        {filteredSearch &&
          <Button
            buttonText="Limpar filtros"
            onPress={() => {
              setFilteredSearch(false)
              setFilterModalIsOpened(false)
              setTypeFilter(null)
              setCategoryFilter(null)
            }}
            textColor={colors.grey.darker}
            customStyles={{ padding: 0 }}
          />
        }
      </View>
    </View>
  );
}

export default FilterSearch;