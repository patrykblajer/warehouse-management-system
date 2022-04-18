package dev.patbla.warehousemanagementsystem.product.unit;

public enum Unit {
    KG, SZT, KPL;

    @Override
    public String toString() {
        return name().toLowerCase();
    }
}