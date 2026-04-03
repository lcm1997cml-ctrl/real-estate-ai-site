"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button, buttonVariants } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2, "請輸入姓名"),
  phone: z.string().min(8, "請輸入有效電話"),
  whatsapp: z.string().min(8, "請輸入有效 WhatsApp"),
  budget: z.string().min(1, "請選擇預算"),
  purpose: z.string().min(1, "請選擇用途"),
  district: z.string().min(1, "請選擇地區"),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

type Props = {
  /** Pre-filled WhatsApp link for this page/project. Defaults to env NEXT_PUBLIC_WHATSAPP_NUMBER. */
  whatsappHref?: string;
};

export function LeadForm({ whatsappHref }: Props) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const defaultWaNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "85291234567";
  const waHref = whatsappHref ?? `https://wa.me/${defaultWaNumber}`;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { budget: "", purpose: "", district: "" },
  });

  const onSubmit = async (values: FormValues) => {
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setSuccess(true);
      } else {
        setError("提交失敗，請稍後再試或改用 WhatsApp 查詢。");
      }
    } catch {
      setError("網絡錯誤，請稍後再試或改用 WhatsApp 查詢。");
    }
  };

  if (success) {
    return (
      <div className="rounded-2xl border bg-white p-8 text-center">
        <p className="text-lg font-semibold text-emerald-700">✓ 已成功提交</p>
        <p className="mt-2 text-neutral-600">我們會整理相關資料並盡快回覆。</p>
        <a
          href={waHref}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex h-9 items-center justify-center rounded-lg bg-emerald-600 px-4 text-sm font-medium text-white hover:bg-emerald-700"
        >
          WhatsApp 查詢
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-2xl border bg-white p-6">
      <div>
        <Label htmlFor="name">姓名</Label>
        <Input id="name" {...register("name")} placeholder="請輸入姓名" />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="phone">電話</Label>
          <Input id="phone" {...register("phone")} placeholder="例如 91234567" />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
        </div>
        <div>
          <Label htmlFor="whatsapp">WhatsApp</Label>
          <Input id="whatsapp" {...register("whatsapp")} placeholder="可與電話相同" />
          {errors.whatsapp && <p className="mt-1 text-sm text-red-600">{errors.whatsapp.message}</p>}
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label>預算範圍</Label>
          <Select onValueChange={(v) => setValue("budget", String(v))}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="選擇預算" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="500萬以下">500 萬以下</SelectItem>
              <SelectItem value="500-800萬">500–800 萬</SelectItem>
              <SelectItem value="800-1200萬">800–1200 萬</SelectItem>
              <SelectItem value="1200萬以上">1200 萬以上</SelectItem>
            </SelectContent>
          </Select>
          {errors.budget && <p className="mt-1 text-sm text-red-600">{errors.budget.message}</p>}
        </div>
        <div>
          <Label>用途</Label>
          <Select onValueChange={(v) => setValue("purpose", String(v))}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="選擇用途" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="自住">自住</SelectItem>
              <SelectItem value="投資">投資</SelectItem>
              <SelectItem value="未決定">未決定</SelectItem>
            </SelectContent>
          </Select>
          {errors.purpose && <p className="mt-1 text-sm text-red-600">{errors.purpose.message}</p>}
        </div>
      </div>
      <div>
        <Label>感興趣地區</Label>
        <Select onValueChange={(v) => setValue("district", String(v))}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="選擇地區" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="啟德">啟德</SelectItem>
            <SelectItem value="將軍澳">將軍澳</SelectItem>
            <SelectItem value="何文田">何文田</SelectItem>
            <SelectItem value="黃竹坑">黃竹坑</SelectItem>
          </SelectContent>
        </Select>
        {errors.district && <p className="mt-1 text-sm text-red-600">{errors.district.message}</p>}
      </div>
      <div>
        <Label htmlFor="notes">備註（選填）</Label>
        <Textarea id="notes" {...register("notes")} placeholder="例如想知付款辦法、可睇樓時段等" />
      </div>
      <Button disabled={isSubmitting} className="w-full bg-amber-600 text-white hover:bg-amber-700">
        {isSubmitting ? "提交中..." : "索取最新資料"}
      </Button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <a
        href={waHref}
        target="_blank"
        rel="noreferrer"
        className={`${buttonVariants({ variant: "outline" })} w-full`}
      >
        WhatsApp 查詢
      </a>
    </form>
  );
}
