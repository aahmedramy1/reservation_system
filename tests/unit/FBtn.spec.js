import { mount } from "@vue/test-utils";
import FBtn from "@/components/FBtn.vue";

describe("FBtn.vue", () => {
  it("renders button with label", () => {
    const label = "Test Button";
    const wrapper = mount(FBtn, {
      propsData: {
        color: "#fff",
        textColor: "#000",
        label,
      },
    });

    expect(wrapper.text()).toMatch(label);
    expect(wrapper.find("button").exists()).toBe(true);
  });

  it("shows loader when loading", () => {
    const wrapper = mount(FBtn, {
      propsData: {
        color: "#fff",
        textColor: "#000",
        loading: true,
      },
    });

    expect(wrapper.find(".loader").exists()).toBe(true);
    expect(wrapper.text()).not.toMatch("Test Button");
  });

  describe("Class computations", () => {
    it("applies outline classes when outline is true", () => {
      const wrapper = mount(FBtn, {
        propsData: {
          color: "#fff",
          textColor: "#000",
          outline: true,
        },
      });

      expect(wrapper.classes()).toContain("border-2");
      expect(wrapper.classes()).toContain("bg-transparent");
    });

    it("applies disabled classes when loading or disabled", () => {
      const wrapper = mount(FBtn, {
        propsData: {
          color: "#fff",
          textColor: "#000",
          loading: true,
        },
      });

      expect(wrapper.classes()).toContain("cursor-not-allowed");
      expect(wrapper.classes()).toContain("opacity-50");

      const wrapper2 = mount(FBtn, {
        propsData: {
          color: "#fff",
          textColor: "#000",
          disabled: true,
        },
      });

      expect(wrapper2.classes()).toContain("cursor-not-allowed");
    });
  });

  describe("Style computations", () => {
    it("applies correct styles for outline variant", () => {
      const color = "#ffffff";
      const wrapper = mount(FBtn, {
        propsData: {
          color,
          textColor: "#000",
          outline: true,
        },
      });

      expect(wrapper.element.style.borderColor).toBe(color);
      expect(wrapper.element.style.backgroundColor).toBe("transparent");
    });
  });

  describe("Disabled state", () => {
    it("disables button when loading", () => {
      const wrapper = mount(FBtn, {
        propsData: {
          color: "#fff",
          textColor: "#000",
          loading: true,
        },
      });

      expect(wrapper.attributes("disabled")).toBe("disabled");
    });

    it("disables button when disabled prop is true", () => {
      const wrapper = mount(FBtn, {
        propsData: {
          color: "#fff",
          textColor: "#000",
          disabled: true,
        },
      });

      expect(wrapper.attributes("disabled")).toBe("disabled");
    });
  });

  describe("Click events", () => {
    it("emits click event when clicked", async () => {
      const wrapper = mount(FBtn, {
        propsData: {
          color: "#fff",
          textColor: "#000",
        },
      });

      await wrapper.trigger("click");
      expect(wrapper.emitted().click).toBeTruthy();
    });

    it("does not emit click when disabled", async () => {
      const wrapper = mount(FBtn, {
        propsData: {
          color: "#fff",
          textColor: "#000",
          disabled: true,
        },
      });

      await wrapper.trigger("click");
      expect(wrapper.emitted().click).toBeFalsy();
    });

    it("does not emit click when loading", async () => {
      const wrapper = mount(FBtn, {
        propsData: {
          color: "#fff",
          textColor: "#000",
          loading: true,
        },
      });

      await wrapper.trigger("click");
      expect(wrapper.emitted().click).toBeFalsy();
    });
  });
});
